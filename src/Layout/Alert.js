import React from "react";
import { connect } from "react-redux";
import { removealerts } from "../Actions/Alert";

const Alert = (props) => {
  const alert_list = () => {
    return (
      <ul className="alert-li">
        {props.alert.map((alert) => {
          return (
            <li className={`alerts alert-${alert.color}`} key={alert.id}>
              {alert.message}
              <button
                className="alert-btn"
                onClick={() => {
                  props.removealerts(alert.id);
                }}
              >
                &#10006;
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    props.alert.length > 0 ? alert_list() : null
    // <ul className="alert-li">
    //   <li className={`alerts alert-success`} >
    //     HI
    //     <button
    //       className="alert-btn"
          
    //     >
    //       &#10006;
    //     </button>
    //   </li>
    // </ul>
  );
};

const mapStatetoProps = (state) => {
  return state;
};
export default connect(mapStatetoProps, { removealerts })(Alert);
