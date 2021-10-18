import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { googlelogin } from "../Actions/AuthAction";

const Landing = ({ googlelogin, isGoogleAuth, isJWTAuth,auth_button }) => {
  if (isGoogleAuth === true && isJWTAuth !== true) {
    return auth_button ? (
      <Redirect to={`/${auth_button}`} />
    ) : (
      <Redirect to="/Login" />
    );
    
  } else if (isGoogleAuth === true && isJWTAuth === true) {
    return <Redirect to="/Room" />;
  }

  return (
    // <!-- loader -->
    <div className="loader">
      <div>
        <b>Web Chat</b>
        <p>Create a room and share your thoughts to your peers</p>

        <Link to="/Register" className="link">
          <button
            className="out"
            onClick={() => {
              googlelogin("Register");
            }}
          >
            SignUp
          </button>
        </Link>

        <Link to="/Login">
          <button
            className="full"
            onClick={() => {
              googlelogin('Login');
            }}
          >
            LogIn
          </button>
        </Link>
      </div>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return state.auth;
};

export default connect(mapStatetoProps, { googlelogin })(Landing);
