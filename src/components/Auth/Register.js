import React,{useState} from 'react'
import "../../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { googlelogout } from "../../Actions/AuthAction";
import {alerts} from '../../Actions/Alert'
import { register } from "../../Actions/User";
import { socket_discon } from "../../Actions/Socket";

const Register = ({
  isGoogleAuth,
  isJWTAuth,
  emailAddress,
  googlelogout,
  alerts,
  register,
  profile,
  
}) => {
  const [user, setUser] = useState({
    name: "",
    email: emailAddress,
    password: "",
    confirm_password: "",
    profile: profile,
  });

  if (isGoogleAuth !== true && isJWTAuth !== true) {
    return <Redirect to="/" />;
  } else if (isGoogleAuth === true && isJWTAuth === true) {
    return <Redirect to="/Room" />;
  }

  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onsubmit = () => {
    if (user.password !== user.confirm_password) {
      alerts("Password's are not matching", "danger");
    }

    register(user);
  };

  return (
    //   <!-- register -->
    <div className="login">
      <b>Sign Up</b>
      <p>
        <i className="fas fa-user"></i> <span>Create Your Account</span>
      </p>
      <input
        placeholder="Name"
        type="text"
        name="name"
        onChange={onchange}
        value={user.name}
      />
      <input
        placeholder="Email Address"
        type="text"
        value={user.email}
        name="email"
        disabled
      />
      <input
        placeholder="Password"
        type="password"
        name="password"
        onChange={onchange}
        value={user.password}
      />
      <input
        placeholder="Confirm Password"
        type="password"
        name="confirm_password"
        onChange={onchange}
        value={user.confirm_password}
      />
      <button className="full" onClick={onsubmit}>
        Register
      </button>
      <button
        className="GLogout"
        onClick={() => {
          googlelogout();
          socket_discon(emailAddress);
        }}
      >
        <i className="fab fa-google"></i>
        &nbsp;LogOut
      </button>
      <section>
        Already have an account?
        <Link to="/Login">
          <span>Sign In</span>
        </Link>
      </section>
    </div>
  );
};

const mapStatetoProps = (state) => {
  
  return state.auth;
};

export default connect(mapStatetoProps, { googlelogout, alerts, register })(
  Register
);
