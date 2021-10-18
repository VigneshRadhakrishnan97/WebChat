import {io} from 'socket.io-client'
import { SOCKET_STATUS, SOCKET_MESSAGE ,SOCKET_ERROR} from "../types";

let socket ;

//socket init
export const socket_init = (emailAddress) =>(dispatch)=> {
  try {
    
    socket = io("http://localhost:5001", {
      transports: ["websocket", "polling"],
    });

    console.log(socket.connected);
    //disconec
    // if (socket.connected)
    //   socket.emit("discon");

    //connection
    socket.on("connect", () => {
      socket.emit("user", emailAddress);
    });

    //connected
    socket.on("connected",  (msg) =>  {
      console.log("connected - " + msg);
      dispatch({ type: SOCKET_STATUS, payload: "connected" });
    });

    //received message
    socket.on("message", (msg) => {
      console.log("Received message from server- ");
      console.log(msg);
      dispatch({ type: SOCKET_MESSAGE ,payload:msg});
    });

    //disconnected
    socket.on("disconnected", async (msg) => (dispatch) => {
      console.log(msg);
      dispatch({ type: SOCKET_STATUS, payload: "connected" });
    });

    //erors
    socket.on("errors", (msg) => {
      console.log("socket error"+msg);
      dispatch({ type: SOCKET_ERROR, payload:msg });
    });
  } catch (error) {
    console.log("socket exception "+error);
    dispatch({ type: SOCKET_ERROR, payload: error.message });
  }
};


// send message
export const sendmsg=(msg)=>{
console.log(msg);
    try {
         console.log(socket.connected);
    if (!socket.connected) 
     socket_init(msg.emailAddress);

        socket.emit("send",msg);
        
    } catch (error) {
        console.log(error);
    }

}


//  DISPATCH
export const socket_discon=()=>{
   socket.emit("discon");
}