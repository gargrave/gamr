import * as types from '../../constants/actionTypes';
import authData from './authData';


function _authAjaxStart() {
  return {
    type: types.AUTH_AJAX_START
  };
}

function _authAjaxEnd() {
  return {
    type: types.AUTH_AJAX_END
  };
}

function _loginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
}

function _loginError(error) {
  return {
    type: types.LOGIN_ERROR,
    error
  };
}

function _logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS
  };
}

/*==============================================
 = Action Creators
 ==============================================*/
export function authAjaxStart() {
  return function(dispatch) {
    dispatch(_authAjaxStart());
  };
}

export function authAjaxEnd() {
  return function(dispatch) {
    dispatch(_authAjaxEnd());
  };
}

export function loginSuccess(user) {
  return function(dispatch) {
    let cleanUserData = authData.buildUserData(user);
    dispatch(_loginSuccess(cleanUserData));
    dispatch(_authAjaxEnd());
  };
}

export function loginError(error) {
  return function(dispatch) {
    dispatch(_loginError(error));
    dispatch(_authAjaxEnd());
  };
}

export function logoutSuccess() {
  return function(dispatch) {
    dispatch(_logoutSuccess());
    dispatch(_authAjaxEnd());
  };
}
