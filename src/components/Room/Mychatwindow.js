import React,{useState} from 'react'
import { sendmsg } from "../../Actions/Socket";
import { connect } from "react-redux";

const Mychatwindow = ({
  auth: { emailAddress, profile,user },
  room: { currentchat }
}) => {
  const [msg, setMsg] = useState({ msg: "" });
  
  const onchange = (e) => {
    setMsg({ ...msg, [e.target.name]: e.target.value });
  };

  const onsend =  () => {
     sendmsg({
      msg: msg.msg,
      emailAddress,
      id: currentchat._id,
      avatar: profile,
      name:user.name
    });
    setMsg({ msg: "" });
  };

  const onkey=(e)=>{
    
    if(e.code ==="Enter" || e.code ==="NumpadEnter")
    onsend();
  }
  return (
    <div className="mychat-footer">
      <input
        placeholder="Chat with your friends..."
        type="text"
        name="msg"
        onChange={onchange}
        value={msg.msg}
        autoFocus={true}
        onKeyPress={onkey}
      />{" "}
      <i className="fas fa-paper-plane" onClick={onsend}></i>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return state;
};

export default connect(mapStatetoProps)(Mychatwindow);
