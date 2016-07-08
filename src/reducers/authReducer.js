import * as types from '../constants/actionTypes';
import initialState from './initialState';


export default function authReducer(state = initialState.user, action) {
  switch (action.type) {

    case types.LOGIN_SUCCESS:
      return action.user;

    case types.LOGOUT_SUCCESS:
      return {};

    default:
      return state;
  }
}
