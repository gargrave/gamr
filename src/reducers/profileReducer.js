import * as types from '../constants/actionTypes';
import initialState from './initialState';


export default function profileReducer(state = initialState.profile, action) {
  switch (action.type) {

    case types.FETCH_PROFILE_SUCCESS:
      return action.profile;

    case types.LOGOUT_SUCCESS:
      return {};

    default:
      return state;
  }
}
