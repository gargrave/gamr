/* eslint-disable no-console */
import auth from '../auth/authApiMock';
import {each} from 'lodash';

import {MOCK_API_DELAY} from '../../constants/env';


const buildRecordData = function(record) {
  let dateNow = new Date();
  return {
    name: record.name.trim(),
    created: dateNow.getTime(),
    modified: dateNow.getTime()
  };
};

let platformId = 10;
let mockDate = new Date();
let platforms = {
  '0': {
    '0': {
      name: 'Nintendo 3DS',
      created: mockDate.getTime(),
      modified: mockDate.getTime()
    },
    '1': {
      name: 'Microsoft Xbox One',
      created: mockDate.getTime(),
      modified: mockDate.getTime()
    },
    '2': {
      name: 'PC (Win)',
      created: mockDate.getTime(),
      modified: mockDate.getTime()
    }
  },
  '1': {
    '3': {
      name: 'Nintendo Wii',
      created: mockDate.getTime(),
      modified: mockDate.getTime()
    },
    '4': {
      name: 'Microsoft Xbox 360',
      created: mockDate.getTime(),
      modified: mockDate.getTime()
    },
    '5': {
      name: 'PC (Win)',
      created: mockDate.getTime(),
      modified: mockDate.getTime()
    }
  }
};

/** Auth state change listeners; this is to mock the real-time nature of firebase. */
let listeners = [];


class PlatformApiMock {
  static getNewRecord() {
    let dateNow = new Date();
    return {
      name: '',
      created: dateNow.getTime(),
      modified: dateNow.getTime()
    };
  }

  /** Creates and saves a new record to the DB. */
  static createRecord(record) {
    console.log('MOCK PLATFORM API: using mock API -> createRecord()');
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let userId = auth.user().uid.toString();
        let userPlatforms = platforms[userId];

        let id = (platformId++).toString();
        let platform = buildRecordData(record);
        userPlatforms[id] = platform;

        this.notifyListeners();
        resolve(platform);
      } else {
        reject('Not logged in'); // not logged in; reject immediately
      }
    });
  }

  /** Updates an existing record in the DB. */
  static updateRecord(record) {
    console.log('MOCK PLATFORM API: using mock API -> updateRecord()');
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let userPlatforms = platforms[auth.user().uid.toString()];
        let id = record.id;

        if (userPlatforms[id]) {
          setTimeout(() => {
            let platform = buildRecordData(record);
            platform.id = id;
            platform.created = record.created;
            userPlatforms[id] = platform;

            this.notifyListeners();
            resolve();
          }, MOCK_API_DELAY);
        } else {
          reject(`No Platform found with id: ${id}.`);
        }
      } else {
        reject('Not logged in'); // not logged in; reject immediately
      }
    });


  }

  /** Adds a listener to db state change events. */
  static addDbListener(callback) {
    console.log('MOCK PLATFORM API: using mock API -> addDbListener()');
    listeners.push(callback);
    callback({
      val: function() {
        return platforms[auth.user().uid.toString()];
      }
    });
  }

  /** Calls all registered state change listeners */
  static notifyListeners() {
    console.log('MOCK PLATFORM API: using mock API -> notifyListeners()');
    each(listeners, callback => {
      callback({
        val: function() {
          return platforms[auth.user().uid.toString()];
        }
      });
    });
  }

  /** Adds a listener to db state change events. */
  static removeDbListener(callback) {
    console.log('MOCK PLATFORM API: using mock API -> removeDbListener()');
    listeners = [];
  }
}

export default PlatformApiMock;
