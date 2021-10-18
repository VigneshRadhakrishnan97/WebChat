import React from 'react'
import {Redirect,Route} from 'react-router-dom'
import {connect} from 'react-redux'


const priaterouter = ({ component: Component, isJWTAuth, ...rest }) => {
  return <Route {...rest} render={(props) => isJWTAuth?<Component {...props} />: <Redirect to="/" />} />;
};

const mapStatetoProps=(state)=>{
    return state.auth;
}
export default connect(mapStatetoProps)(priaterouter);
