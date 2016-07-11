import * as types from '../constants/actionTypes';
import initialState from './initialState';


export default function profileReducer(state = initialState.platforms, action) {
  switch (action.type) {

    case types.FETCH_PLATFORMS_SUCCESS:
      return action.platforms;

    case types.CREATE_PLATFORM_SUCCESS:
      return state;

    case types.CREATE_PLATFORM_ERROR:
      return state;

    case types.LOGOUT_SUCCESS:
      return [];

    default:
      return state;
  }
}
