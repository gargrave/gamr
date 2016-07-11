import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import api from './apiReducer';
import user from './authReducer';
import profile from './profileReducer';
import platforms from './platformReducer';


const rootReducer = combineReducers({
  api,
  user,
  profile,
  platforms,
  routing: routerReducer
});

export default rootReducer;
