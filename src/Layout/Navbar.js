import React, { useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { googlelogin, googlelogout } from "../Actions/AuthAction";
import { socket_init, socket_discon } from "../Actions/Socket";
import {alerts} from '../Actions/Alert'


const Navbar = ({
  googlelogin,
  googlelogout,
  alerts,
  isJWTAuth,
  user,
  profile,
  socket_init,
  emailAddress,
}) => {
  useEffect(() => {
    if (emailAddress !== null) {
      console.log("nav - " + emailAddress);
      socket_init(emailAddress);
    }
  }, [emailAddress]);

  const guestLink = (
    <ul>
      <Link to="/Register">
        <li
          onClick={() => {
            googlelogin("Register");
          }}
        >
          SignUp
        </li>
      </Link>
      <Link to="/Login">
        <li
          onClick={() => {
            googlelogin("Login");
          }}
        >
          LogIn
        </li>
      </Link>
    </ul>
  );

  const authLink = (
    <ul>
      <Link to="/">
        <li
          onClick={() => {
            googlelogout();
            socket_discon(emailAddress);
          }}
        >
          SignOut
        </li>
      </Link>
      <Link to="/">
        <li className="profile">
          {user !== null && user.name}
          <img src={user !== null && profile} alt=""></img>
        </li>
      </Link>
    </ul>
  );

  return (
    //  <!-- header -->
    <div className="navbar">
      <section onClick={() => alerts("test", "success")}>
        <Link to="/">
          <i className="fas fa-comments">WebChat</i>
        </Link>
      </section>
      {isJWTAuth ? authLink : guestLink}
    </div>
  );
};

const mapStatetoProps=(state)=>{
  return state.auth;
}
export default connect(mapStatetoProps, {
  googlelogin,
  googlelogout,
  alerts,
  socket_init,
})(Navbar);
