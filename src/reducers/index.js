import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import api from './apiReducer';
import user from './authReducer';
import profile from './profileReducer';
import platforms from './platformReducer';
import games from './gameReducer';


const rootReducer = combineReducers({
  api,
  user,
  profile,
  platforms,
  games,
  routing: routerReducer
});

export default rootReducer;
