import React, { useState, useEffect } from "react";
import emailverify from "../../emailverify/Emailverify";
import { connect } from "react-redux";
import {createchat} from '../../Actions/Room'
import {withRouter} from 'react-router-dom'

const CreateRoom = ({
  close,
  auth: { emailAddress },
  createchat,
  room: { chat_createfail },
  history
}) => {
  const [room, setRoom] = useState({
    roomname: "",
    email: "",
    err: "",
    roomerr: "",
    emails: [
      
    ],
  });

  //    { email: "vigneshkrishnantce3@gmail.com", v: 1 },
  //       { email: "vigneshkrishnantce2@gmail.com", v: 0 },
  //       { email: "vikkikrishnan97@gmail.com", v: 1 },

  useEffect(() => {
    setRoom({
      ...room,

      roomerr: chat_createfail,
    });
    
  }, [chat_createfail]);

    const onchange = (e) => {
      setRoom({
        ...room,
        [e.target.name]: e.target.value,
        err: "",
        roomerr: "",
      });
    };
  const { roomname, email, err, emails, roomerr } = room;

  //verify email...
  const emailvalid = async () => {
    setRoom({ ...room, err: "Verifying..." });

    if (email === emailAddress) {
      return setRoom({ ...room, err: "Email Account should not be yours" });
    }

    //duplicate
    const duplicate = emails.find((eml) => {
      if (eml.email === email) return true;
      return false;
    });

    if (duplicate) return setRoom({ ...room, err: "Email was added..." });

    //////
    const res = await emailverify(email);
    if (res === "DELIVERABLE")
      setRoom({
        ...room,
        emails: [...emails, { email, v: 1 }],
        email: "",
        err: "Verified",
      });
    else if (res === "UNDELIVERABLE")
      setRoom({ ...room, err: "Email Account doesn't exist" });
    else if (res === "Please enter valid email")
      setRoom({ ...room, err: "Please enter valid email" });
    else if (res === "server error")
      setRoom({
        ...room,
        emails: [...emails, { email, v: 0 }],
        email: "",
        err: "Couldn't Verify",
      });
  };

  //remove email
  const remove_email = (eml) => {
    setRoom({
      ...room,
      emails: emails.filter(({ email, v }) => {
        if (eml !== email) return true;

        return false;
      }),
    });
  };

  //on submit
  const onsubmit = () => {
    let emailids = [];
    if (!roomname)
      return setRoom({ ...room, roomerr: "Please enter room name" });
    if (emails.length <= 0)
      return setRoom({ ...room, err: "Please enter emails" });
    emails.forEach((eml) => {
      emailids = [...emailids, eml.email];
    });
    console.log({ roomname, emailids });

    createchat({ roomname, emailids, history });
  };

  const render_grid = () => {
    return (
      <div className="grid-container">
        {emails.map(({ email, v }) => {
          let colr = v === 1 ? "green" : "rgb(156, 156, 0)";
          //style={{color:colr,borderColor:colr}}
          return (
            <div key={email} className="grid-item">
              <section style={{ color: colr, borderColor: colr }}>
                {email}{" "}
                <span
                  onClick={() => {
                    remove_email(email);
                  }}
                >
                  {" "}
                  &#10006;
                </span>
              </section>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="modal-content">
      <div className="model-header">
        <p>CreateRoom</p>
        <section onClick={close}> &#10006;</section>
      </div>
      <div className="model-form">
        <label>Room Name</label>
        <label style={{ color: "blue", fontSize: "80%" }}>
          {roomerr !== "" ? roomerr : null}
        </label>
        <input
          type="text"
          name="roomname"
          onChange={onchange}
          value={room.roomname}
          className="model-roombox"
        ></input>
        <label>Email Address</label>{" "}
        <label style={{ color: "blue", fontSize: "80%" }}>
          {err !== "" ? err : null}
        </label>
        <br></br>
        <input
          type="text"
          name="email"
          onChange={onchange}
          value={room.email}
          className="model-emailbox"
        ></input>
        <button className="out" onClick={() => emailvalid()}>
          ADD
        </button>
      </div>

      {emails.length > 0 ? render_grid() : null}

      <div className="model-footer">
        <button className="full" onClick={() => onsubmit()}>
          Create
        </button>
      </div>
    </div>
  );
};

const mapStatetoProps = (state) => {
  
  return state;
};

export default connect(mapStatetoProps, { createchat })(withRouter(CreateRoom));
