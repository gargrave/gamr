import * as types from '../../constants/actionTypes';
import {USE_MOCK_APIS} from '../../constants/env';
import {fbToArray} from '../firebase/firebaseUtils';

import mockProfileApi from './profileApiMock';
import liveProfileApi from './profileApi';


const api = USE_MOCK_APIS ? mockProfileApi : liveProfileApi;

function _fetchProfileSuccess(profile) {
  return {
    type: types.FETCH_PROFILE_SUCCESS,
    profile
  };
}

function updateProfileSuccess(profile) {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    profile
  };
}
function updateProfileError() {
  return {
    type: types.UPDATE_PROFILE_ERROR
  };
}

/*=============================================
 = Thunk Action Creators
 =============================================*/
export function fetchProfileSuccess(profile) {
  return function(dispatch) {
    dispatch(_fetchProfileSuccess(profile));
  };
}

export function updateProfile(profile) {
  return function(dispatch) {
    return api.updateRecord(profile)
      .then(res => {
        dispatch(updateProfileSuccess(fbToArray(res)));
      })
      .catch(err => {
        dispatch(updateProfileError());
        throw (err);
      });
  };
}
