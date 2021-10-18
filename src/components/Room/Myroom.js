import React,{useEffect} from 'react'
import Myroomlist from './Myroomlist'
import Mychat from './Mychat'
import '../../Chat.css'
import { connect } from "react-redux";
import { getchats } from "../../Actions/Room";


const Myroom = ({ getchats, auth: { emailAddress } }) => {
  useEffect(() => {
    getchats();
  
  }, []);
  return (
    <div className="myroomlist_grid-container">
      <Myroomlist />
      <Mychat />
    </div>
  );
};

const mapStatetoProps = (state) => {
  return state;
};

export default connect(mapStatetoProps, { getchats })(Myroom);
