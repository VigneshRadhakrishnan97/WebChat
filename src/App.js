import React,{useEffect} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {Provider} from 'react-redux'

import Navbar from "./Layout/Navbar";
import Landing from "./Layout/Landing";
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Store from './store'
import {loadGooleAuth} from './Actions/AuthAction'
import Room from './components/Room/Room'
import Alert from './Layout/Alert'
import PrivateRoute from './privateroute/PrivateRoute'
import CreateRoom from './components/Room/CreateRoom'
import Myroom from './components/Room/Myroom'

const App = () => {

useEffect(()=>{
  Store.dispatch(loadGooleAuth());
},[]);

  return (
    <React.Fragment>
      <Provider store={Store}>
        <BrowserRouter>
          <Alert />
          <Navbar />
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/Login" component={Login} exact />
            <Route path="/Register" component={Register} exact />
            <PrivateRoute path="/Room" component={Room} exact />
            <PrivateRoute path="/CreateRoom" component={CreateRoom} exact />
            <PrivateRoute path="/Myroom" component={Myroom} exact />
          </Switch>
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
};

export default App;
