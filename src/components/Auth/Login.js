import React,{useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { googlelogout } from "../../Actions/AuthAction";
import { login } from "../../Actions/User";
import { alerts } from "../../Actions/Alert";
import { socket_discon } from "../../Actions/Socket";

const Login = ({
  isGoogleAuth,
  isJWTAuth,
  emailAddress,
  googlelogout,
  login,

}) => {
  const [user, setUser] = useState({
    email: emailAddress,
    password: "",
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
    if (user.password.length <= 0) {
      alerts("Please Enter your password", "danger");
    }

    login(user);
  };

  return (
    //   <!-- login -->
    <div className="login">
      <b>Sign In</b>
      <p>
        <i className="fas fa-user"></i> <span>Sign into Your Account</span>
      </p>
      <input
        placeholder="Email Address"
        type="text"
        value={user.email}
        name="email"
        onChange={onchange}
        disabled
      />
      <input
        placeholder="Password"
        type="password"
        name="password"
        value={user.password}
        onChange={onchange}
      />
      <button className="full" onClick={onsubmit}>
        LogIn
      </button>
      <button
        className="GLogout"
        onClick={() => {
          socket_discon(emailAddress);
          googlelogout();
          
        }}
      >
        <i className="fab fa-google"></i>&nbsp;LogOut
      </button>
      <section>
        Don't have an account?
        <Link to="/Register">
          <span>Sign Up</span>
        </Link>
      </section>
    </div>
  );
};

const mapStatetoProps = (state) => {
  
  return state.auth;
};

export default connect(mapStatetoProps, { googlelogout, login })(
  Login
);
