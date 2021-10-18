import axios from "axios";
import { alerts } from "./Alert";
import {
  ROOM_CREATE_FAIL,
  NO_TOKEN,
  CURRENT_CHAT,
  MYCHAT_LIST,
  CURRENT_CHAT_STORE,
} from "../types";
import { dispatchError } from "./User";

//create chatroom
export const createchat = ({ roomname, emailids, history }) => async (dispatch) => {
  let token = localStorage.getItem("token");

  if (!token) {
    return dispatch({ type: NO_TOKEN });
  }
  try {
    axios.defaults.headers.common["jwt"] = token;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      chatname: roomname,
      emails: emailids,
    });

    const res = await axios.post("/api/createchat", body, config);
    
    dispatch(getchatbyid(res.data));
    dispatch(getchats());
    dispatch(alerts("ChatRoom Created..."));
    history.push("/Myroom");
  } catch (error) {
    console.log(error);
    dispatch({ type: ROOM_CREATE_FAIL, payload: error.response.data.error });
  }
};

//get chatroom by id
export const getchatbyid = (id) => async (dispatch) => {
  let token = localStorage.getItem("token");
  
  if (!token) {
    return dispatch({ type: NO_TOKEN });
  }
  try {
    axios.defaults.headers.common["jwt"] = token;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    

    const res = await axios.get(`/api/createchat/${id}`,  config);
    
    dispatch({ type: CURRENT_CHAT ,payload:res.data});
    
  } catch (error) {
    
    dispatch(dispatchError(error));
  }
};

//get chatroom by id from store
export const getchatbyid_store = (id) =>  (dispatch) => {

  try {
   
    dispatch({ type: CURRENT_CHAT_STORE, payload: id });
    
  } catch (error) {
    console.log(error);
    //dispatch(alerts(error));
  }
};

//get all chatroom
export const getchats = () => async (dispatch) => {
  let token = localStorage.getItem("token");
  
  if (!token) {
    return dispatch({ type: NO_TOKEN });
  }
  try {
    axios.defaults.headers.common["jwt"] = token;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    

    const res = await axios.get(`/api/createchat`,  config);
    
    dispatch({ type: MYCHAT_LIST, payload: res.data });
    
  } catch (error) {
    
    dispatch(dispatchError(error));
  }
};

//delete chatroom by id
export const deletechatbyid = (id) => async (dispatch) => {
  let token = localStorage.getItem("token");
  
  if (!token) {
    return dispatch({ type: NO_TOKEN });
  }
  try {
    axios.defaults.headers.common["jwt"] = token;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    

    const res = await axios.delete(`/api/createchat/${id}`,  config);
    dispatch(getchats());
    
    dispatch(alerts(res.data.msg,'success'));
    
  } catch (error) {
    
    dispatch(dispatchError(error));
  }
};
