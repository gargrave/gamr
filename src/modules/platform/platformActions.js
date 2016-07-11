import * as types from '../../constants/actionTypes';
import {USE_MOCK_APIS} from '../../constants/env';
import {fbToArray} from '../firebase/firebaseUtils';

import mockPlatformApi from './platformApiMock';
import livePlatformApi from './platformApi';


const api = USE_MOCK_APIS ? mockPlatformApi : livePlatformApi;

function _fetchPlatformsSuccess(platforms) {
  return {
    type: types.FETCH_PLATFORMS_SUCCESS,
    platforms
  };
}

// create actions
function createPlatformBegin() {
  return {
    type: types.CREATE_PLATFORM_BEGIN
  };
}

function createPlatformSuccess(platform) {
  return {
    type: types.CREATE_PLATFORM_SUCCESS,
    platform
  };
}

function createPlatformError() {
  return {
    type: types.CREATE_PLATFORM_ERROR
  };
}

// update actions
function updatePlatformBegin() {
  return {
    type: types.UPDATE_PLATFORM_BEGIN
  };
}

function updatePlatformSuccess(platform) {
  return {
    type: types.UPDATE_PLATFORM_SUCCESS,
    platform
  };
}

function updatePlatformError() {
  return {
    type: types.UPDATE_PLATFORM_ERROR
  };
}

/*=============================================
 = Thunk Action Creators
 =============================================*/
export function fetchPlatformsSuccess(platforms) {
  return function(dispatch) {
    dispatch(_fetchPlatformsSuccess(fbToArray(platforms)));
  };
}

export function createPlatform(platform) {
  return function(dispatch) {
    dispatch(createPlatformBegin());
    return api.createRecord(platform)
      .then(res => {
        dispatch(createPlatformSuccess(res));
      })
      .catch(err => {
        dispatch(createPlatformError());
        throw (err);
      });
  };
}

export function updatePlatform(platform) {
  return function(dispatch) {
    dispatch(updatePlatformBegin());
    return api.updateRecord(platform)
      .then(res => {
        dispatch(updatePlatformSuccess(res));
      })
      .catch(err => {
        dispatch(updatePlatformError());
        throw (err);
      });
  };
}
