import React, { useState } from "react";
import "../../Room.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CreateRoom from "./CreateRoom";
import Model from "../../Model";


const Room = ({ profile, user, emailAddress }) => {
  
  const [createRoom, setcreateRoom] = useState(false);

  const onclose = () => {
    setcreateRoom(false);
  };

  return (
    <React.Fragment>
      {createRoom ? (
        <Model close={onclose}>
          <CreateRoom close={onclose} />
        </Model>
      ) : null}

      <div className="room_loader">
        <div>
          <img src={profile} alt=""></img>

          <br></br>
          <b>{user.name}</b>
          <hr></hr>
          <ul>
            <li onClick={() => setcreateRoom(true)}>Create Room</li>

            <Link to="/Myroom">
              <li>My Room</li>
            </Link>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  return state.auth;
};

export default connect(mapStatetoProps)(Room);
