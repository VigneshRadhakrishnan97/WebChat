import axios from "axios";
import { alerts } from "./Alert";
import {
  USER_REGISTER,
  NO_TOKEN,
  JWTAUTH_FAIL,
  JWTAUTH_SUCCESS,
  LOGIN_SUCCESS,
} from "../types";

//load user
export const loaduser=()=>async(dispatch)=>{
  let token=localStorage.getItem('token');
  
  if(!token)
  {
    return dispatch({ type: NO_TOKEN });
  }
  try {
    axios.defaults.headers.common["jwt"] = token;
    const res =await axios.get("/api/auth");
    console.log(res.data)
    dispatch({ type: JWTAUTH_SUCCESS, payload: res.data });
    
  } catch (error) {
    dispatch({ type: JWTAUTH_FAIL });
    dispatch(dispatchError(error));
  }

}


//User Register

export const register = ({email,name,password,profile}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({email,name,password,role:'user',profile});
  
  try {
      const res = await axios.post(
        "/api/user",
        body,
        config
      );
      console.log(res.data);
      dispatch({ type: USER_REGISTER, payload: res.data.token});
      dispatch(loaduser());
      dispatch(alerts("Successfully Regisered..."));
      
  } catch (error) {
      
   dispatch( dispatchError(error));
};


}


//User Login

export const login = ({email,password}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({email,password});
  console.log(body);
  try {
      const res = await axios.post(
        "/api/auth",
        body,
        config
      );
      console.log(res.data);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.token});
      dispatch(loaduser());
      
  } catch (error) {
      
   dispatch( dispatchError(error));
};


}

//dispatch ERROR alert
export const dispatchError = (error) =>(dispatch)=> {
 
  let errors = (error !== null)&& (error.response.data.error);
console.log(errors);
  if (errors)
    errors.forEach((err) => {
       console.log(error);
      dispatch(alerts(err.msg, "danger"));
    });
};