import {combineReducers} from 'redux'

import AuthReducer from './AuthReducer'
import AlertReducer from './AlertReducer'
import RoomReducer from './RoomReducer';

export default combineReducers({
  auth: AuthReducer,
  alert: AlertReducer,
  room: RoomReducer,
});
