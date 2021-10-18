import React from 'react'
import ReactDOM from 'react-dom'
import './Room.css'

const Model = ({children,close}) => {
    return ReactDOM.createPortal(
      <div className="modal" onClick={close}>
        <span onClick={(e) => e.stopPropagation()}>{children}</span>
      </div>,
      document.getElementById("model")
    );
}

export default Model
