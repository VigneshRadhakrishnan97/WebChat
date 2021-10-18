import React ,{useRef,useEffect}from 'react'
import { connect } from "react-redux";
import Moment from "react-moment";
import Mychatwindow from './Mychatwindow';

const Mychat = ({room:{currentchat},auth:{emailAddress}}) => {
const reff=useRef();
   

    useEffect(()=>{
      if(reff && reff.current )
      {
     
      reff.current.scrollTop =
        reff.current.scrollHeight - reff.current.clientHeight;
      }
    })

    const renderlist=()=>(
        <ul ref={reff} >
            {currentchat.chat.map((chat,index)=>{
              let pos = emailAddress === chat.email ? "right" : "left";
                return (
                  <li className={`mychat-body-pos ${pos}`} key={index}>
                    <p>
                      <img src={chat.avatar}></img> <b>{chat.name}</b>
                    </p>

                    <div className="mychat-body-text">{chat.text}</div>

                    <Moment
                      format="YYYY-MM-DD HH:mm:ss"
                      className="date-format"
                    >
                      {chat.date}
                    </Moment>
                  </li>
                );
            })}
        </ul>
    )

    const render = () => (
      <div className="mychat">
        <div className="mychat-header">
          <i className="fas fa-users"></i>
          <b>{currentchat.chatname}</b>
          <p>
            <span>{`Admin : ${currentchat.creator}`}</span>
            {currentchat.users
              .filter((user) => currentchat.creator!==user)
              .join(" , ")}
          </p>
        </div>

        <div className="mychat-body">
          {currentchat !== null && currentchat.chat.length > 0 && renderlist()}
        </div>
        <Mychatwindow />
      </div>
    );

    return currentchat !== null ? render() : null;
}

const mapStatetoProps = (state) => {
  return state;
};

export default connect(mapStatetoProps)(Mychat)
