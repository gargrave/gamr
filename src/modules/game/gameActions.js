import * as types from '../../constants/actionTypes';
import {USE_MOCK_APIS} from '../../constants/env';
import {fbToArray} from '../firebase/firebaseUtils';
import gameData from './gameData';

import mockGameApi from './gameApiMock';
import liveGameApi from './gameApi';


const api = USE_MOCK_APIS ? mockGameApi : liveGameApi;

function _fetchGamesSuccess(games) {
  return {
    type: types.FETCH_GAMES_SUCCESS,
    games
  };
}

// create actions
function createGameBegin() {
  return {
    type: types.CREATE_GAME_BEGIN
  };
}

function createGameSuccess(game) {
  return {
    type: types.CREATE_GAME_SUCCESS,
    game
  };
}

function createGameError() {
  return {
    type: types.CREATE_GAME_ERROR
  };
}

// update actions
function updateGameBegin() {
  return {
    type: types.UPDATE_GAME_BEGIN
  };
}

function updateGameSuccess(game) {
  return {
    type: types.UPDATE_GAME_SUCCESS,
    game
  };
}

function updateGameError() {
  return {
    type: types.UPDATE_GAME_ERROR
  };
}

// delete actions
function deleteGameBegin() {
  return {
    type: types.DELETE_GAME_BEGIN
  };
}

function deleteGameSuccess(game) {
  return {
    type: types.DELETE_GAME_SUCCESS,
    game
  };
}

function deleteGameError() {
  return {
    type: types.DELETE_GAME_ERROR
  };
}

/*=============================================
 = Thunk Action Creators
 =============================================*/
export function fetchGamesSuccess(games) {
  return function(dispatch) {
    let gamesArray = gameData.parseGamesList(fbToArray(games));
    dispatch(_fetchGamesSuccess(gamesArray));
  };
}

export function createGame(game) {
  return function(dispatch) {
    dispatch(createGameBegin());
    return api.createRecord(game)
      .then(res => {
        dispatch(createGameSuccess(res));
      })
      .catch(err => {
        dispatch(createGameError());
        throw (err);
      });
  };
}

export function updateGame(game) {
  return function(dispatch) {
    dispatch(updateGameBegin());
    return api.updateRecord(game)
      .then(res => {
        dispatch(updateGameSuccess(res));
      })
      .catch(err => {
        dispatch(updateGameError());
        throw (err);
      });
  };
}

export function deleteGame(game) {
  return function(dispatch) {
    dispatch(deleteGameBegin());
    return api.destroyRecord(game)
      .then(res => {
        dispatch(deleteGameSuccess());
      })
      .catch(err => {
        dispatch(deleteGameError());
        throw (err);
      });
  };
}
