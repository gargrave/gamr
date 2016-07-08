import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import api from './apiReducer';
import user from './authReducer';
import profile from './profileReducer';


const rootReducer = combineReducers({
  api,
  user,
  profile,
  routing: routerReducer
});

export default rootReducer;
