import {
  GOOGLE_SIGNEDIN,
  GOOGLE_SIGNEDOUT,
  AUTH_BUTTON,
  USER_REGISTER,
  NO_TOKEN,
  JWTAUTH_FAIL,
  JWTAUTH_SUCCESS,
  LOGIN_SUCCESS,
} from "../types";

const initialState = {
  isGoogleAuth: null,
  isJWTAuth: null,
  emailAddress: null,
  profile:null,
  user: null,
  auth_button:null,
  loading:false
};

export default function AuthReducer(state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {
    
    case GOOGLE_SIGNEDIN: {
      console.log(payload);
      return {
        ...state,
        isGoogleAuth: true,
        emailAddress: payload.email,
        profile:payload.profile,
        loading: true,
      };
    }
    case GOOGLE_SIGNEDOUT: {
      localStorage.removeItem("token");
      return {
        ...state,
        isGoogleAuth: false,
        isJWTAuth:false,
        user:null,
        emailAddress: null,
        auth_button: null,
        loading: false,
      };
    }
    case AUTH_BUTTON:{
      return { ...state, auth_button:payload };
    }

    case JWTAUTH_SUCCESS:{
      return { ...state, loading: false, user: payload, isJWTAuth: true };
    }

    case JWTAUTH_FAIL:
    case NO_TOKEN:{
      localStorage.removeItem("token");
      return { ...state, isJWTAuth:false,loading:false };
    }

    case LOGIN_SUCCESS:
    case USER_REGISTER:{
     
      localStorage.setItem("token", payload);
      return { ...state, loading: true, isJWTAuth:false };
    }
    default: {
      
      return state;
    }
  }
}
