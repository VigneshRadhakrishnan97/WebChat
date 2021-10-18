import React, { useRef } from "react";
import "../../Chat.css";
import { connect } from "react-redux";
import { getchatbyid_store, deletechatbyid } from "../../Actions/Room";

const Myroomlist = ({
  auth: { emailAddress },
  room: { currentchat, mychat_list },
  getchatbyid_store,
  deletechatbyid,
}) => {
  let reff = useRef();

  const onselect = () => {
    if (
      currentchat !== null &&
      reff.current &&
      reff.current.childNodes.length > 0
    ) {
      reff.current.childNodes.forEach((node) => {
        if (node.accessKey === currentchat._id)
          node.style.backgroundColor = "rgb(185, 226, 241)";
        else node.style.backgroundColor = "rgb(238, 238, 238)";
      });
    }
  };
  onselect();

  const onmoseover = (id) => {
    reff.current.childNodes.forEach((node) => {
      if (node.accessKey === id)
        node.style.backgroundColor = "rgb(211, 232, 241)";
      else node.style.backgroundColor = "rgb(238, 238, 238)";

      if (currentchat !== null && node.accessKey === currentchat._id)
        node.style.backgroundColor = "rgb(185, 226, 241)";
    });
  };
  const renderlist = () => {
    return (
      <ul ref={reff}>
        {mychat_list.chatid.map((chat) => {
          return (
            <li
              accessKey={chat.id}
              key={chat.id}
              onClick={(e) => {
                onchatclick(chat.id);
              }}
              onMouseOver={() => {
                onmoseover(chat.id);
              }}
              onMouseOut={() => {
                onselect();
              }}
            >
              <i className="fas fa-users"></i> {chat.chatname}
              {chat.Notify ? (
                <span className="Notify">{chat.Notify}</span>
              ) : null}
              {chat.creator === emailAddress ? (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <i
                    className="fas fa-trash-alt"
                    onClick={() => onchatdelete(chat.id)}
                  ></i>
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    );
  };

  const onchatclick = (id) => {
    
    getchatbyid_store(id);
  };

  const onchatdelete = (id) => {
    deletechatbyid(id);
  };

  return (
    <div className="myroomlist">
      <div>
        <b>MyChat List</b>
      </div>

      {mychat_list && mychat_list.chatid.length > 0 && renderlist()}
    </div>
  );
};

const mapStatetoProps = (state) => {
  return state;
};

export default connect(mapStatetoProps, { getchatbyid_store, deletechatbyid })(
  Myroomlist
);
