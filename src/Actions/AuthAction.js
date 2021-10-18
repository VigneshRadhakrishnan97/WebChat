import { GOOGLE_SIGNEDIN, GOOGLE_SIGNEDOUT, AUTH_BUTTON } from "../types";
import { alerts } from "./Alert";
import {loaduser} from './User'

var GoogleAuth = null;

//Google Auth set up
export const loadGooleAuth = () => (dispatch) => {
  if (!GoogleAuth)
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
           // "771505577705-pp6sr70mmtpa9oaikismo48qk60to9h2.apps.googleusercontent.com",
             "771505577705-mq2r488t3bdsjbf2vfaiffqs91iu2269.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          GoogleAuth = window.gapi.auth2.getAuthInstance();
          dispatch(googleSignin());
          GoogleAuth.isSignedIn.listen(() => dispatch(googleSignin()));
        })
        .catch((e) => {
          
          console.log(e);
        });
    });
};

//On Sign in change
export const googleSignin = () => (dispatch) => {
  try {
    if (GoogleAuth.isSignedIn.get() === true) {
      dispatch({
        type: GOOGLE_SIGNEDIN,
        payload: {
          email: GoogleAuth.currentUser.get().getBasicProfile().getEmail(),
          profile: GoogleAuth.currentUser.get().getBasicProfile().getImageUrl(),
        },
      });
     
      dispatch(loaduser());
    } else if (GoogleAuth.isSignedIn.get() === false) {
      dispatch({ type: GOOGLE_SIGNEDOUT });
      // console.log("FALSE ");
    }
  } catch (error) {
    console.log(error);
  }
};

//Google Login
export const googlelogin = (buttonclick) => (dispatch, getstate) => {
  try {
    if (!getstate().auth.isGoogleAuth) {
      GoogleAuth.signIn().catch((e) => {
        e.error.toString().includes("block")
          ? dispatch(alerts(e.error, "danger"))
          : dispatch(alerts(e.error));
      
      });
      if (buttonclick) dispatch({ type: AUTH_BUTTON, payload: buttonclick });
    }
  } catch (error) {
    dispatch(alerts(error));
  }
};

//Google Logout
export const googlelogout = (buttonclick) => (dispatch, getstate) => {
  try {
    if (getstate().auth.isGoogleAuth) GoogleAuth.signOut();
  } catch (error) {
    dispatch(alerts(error));
  }
};
