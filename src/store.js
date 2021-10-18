import { createStore, applyMiddleware}  from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import Reducer from './Reducers'

const store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;



//502089917017-n1ir4utsjgpd5ppbipolcikh3nbrmgra.apps.googleusercontent.com


