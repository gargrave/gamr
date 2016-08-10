/* eslint-disable no-console */
import auth from '../auth/authApiMock';
import {each} from 'lodash';

import {MOCK_API_DELAY} from '../../constants/env';
import profileData from './profileData';


let profiles = {
  '0': {
    name: 'Dude McGee'
  },
  '1': {
    name: 'Bob Smith'
  }
};

/** Auth state change listeners; this is to mock the real-time nature of firebase. */
let listeners = [];


class ProfileApiMock {
  /** Creates and saves a new record to the DB. */
  static createProfile(user) {
    console.log('MOCK PROFILE API: using mock API -> createProfile()');
    return new Promise((resolve, reject) => {
      let profile = profileData.getNewRecord();
      profiles[user.uid] = profile;
      resolve(profile);
    });
  }

  /** Updates an existing record in the DB. */
  static updateRecord(record) {
    console.log('MOCK PROFILE API: using mock API -> updateRecord()');
    if (auth.isLoggedIn()) {
      let userId = auth.user().uid.toString();
      let existingProfile = profiles[userId];

      if (existingProfile) {
        return new Promise((resolve) => {
          setTimeout(() => {
            let id = record.id;
            let updatedProfile = profileData.buildRecordData(record);
            updatedProfile.id = id;
            profiles[userId] = updatedProfile;
            this.notifyListeners();
            resolve();
          }, MOCK_API_DELAY);
        });
      }
    }
  }

  /** Adds a listener to db state change events. */
  static addDbListener(callback) {
    console.log('MOCK PROFILE API: using mock API -> addDbListener()');
    listeners.push(callback);
    callback({
      val: function() {
        return profiles[auth.user().uid.toString()];
      }
    });
  }

  /** Calls all registered state change listeners */
  static notifyListeners() {
    console.log('MOCK PROFILE API: using mock API -> notifyListeners()');
    each(listeners, callback => {
      callback({
        val: function() {
          return profiles[auth.user().uid.toString()];
        }
      });
    });
  }

  /** Adds a listener to db state change events. */
  static removeDbListener(callback) {
    console.log('MOCK PROFILE API: using mock API -> removeDbListener()');
    listeners = [];
  }
}

export default ProfileApiMock;
