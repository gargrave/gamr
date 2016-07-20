import * as types from '../constants/actionTypes';
import initialState from './initialState';


export default function profileReducer(state = initialState.games, action) {
  switch (action.type) {

    case types.FETCH_GAMES_SUCCESS:
      return action.games;

    case types.CREATE_GAME_SUCCESS:
      return state;

    case types.CREATE_GAME_ERROR:
      return state;

    case types.LOGOUT_SUCCESS:
      return [];

    default:
      return state;
  }
}
