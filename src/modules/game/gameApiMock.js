/* eslint-disable no-console */
import auth from '../auth/authApiMock';
import {each} from 'lodash';

import {MOCK_API_DELAY} from '../../constants/env';
import gameData from './gameData';


let gameId = 10;
let mockDate = new Date();
let timestamp = mockDate.getTime();
let games = {
  '0': {
    '0': {
      name: 'Starcraft 2',
      platform: '2',
      dates: [
        '2016-06-04',
        '2016-08-01',
        '2016-07-11',
        '2016-08-02',
        '2016-04-11'
      ],
      finished: true,
      created: timestamp,
      modified: timestamp
    },
    '1': {
      name: 'Diablo 3',
      platform: '2',
      dates: [
        '2016-07-06'
      ],
      finished: true,
      created: timestamp,
      modified: timestamp
    },
    '2': {
      name: 'Heroes of the Storm',
      platform: '2',
      dates: [
        '2016-07-04',
        '2016-07-06',
        '2016-07-15'
      ],
      finished: false,
      created: timestamp,
      modified: timestamp
    },
    '3': {
      name: 'Starbound',
      platform: '2',
      dates: [],
      finished: true,
      created: timestamp,
      modified: timestamp
    }
  },
  '1': {
    '3': {
      name: 'Fallout 4',
      platform: '2',
      dates: [
        '2016-06-04',
        '2016-07-06'
      ],
      finished: true,
      created: timestamp,
      modified: timestamp
    },
    '4': {
      name: 'Starcraft 2',
      platform: '2',
      dates: [
        '2016-05-04',
        '2016-07-06'
      ],
      finished: false,
      created: timestamp,
      modified: timestamp
    },
    '5': {
      name: 'Overwatch',
      platform: '2',
      dates: [
        '2016-03-04',
        '2016-08-06'
      ],
      finished: false,
      created: timestamp,
      modified: timestamp
    }
  }
};

/** Auth state change listeners; this is to mock the real-time nature of firebase. */
let listeners = [];


class GameApiMock {
  /** Creates and saves a new record to the DB. */
  static createRecord(record) {
    console.log('MOCK GAME API: using mock API -> createRecord()');
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        setTimeout(() => {
          let userId = auth.user().uid.toString();
          let userGames = games[userId];

          let id = (gameId++).toString();
          let game = gameData.buildRecordData(record);
          userGames[id] = game;

          this.notifyListeners();
          resolve(game);
        }, MOCK_API_DELAY);
      } else {
        reject('Not logged in'); // not logged in; reject immediately
      }
    });
  }

  /** Updates an existing record in the DB. */
  static updateRecord(record) {
    console.log('MOCK GAME API: using mock API -> updateRecord()');
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let userGames = games[auth.user().uid.toString()];
        let id = record.id;

        if (userGames[id]) {
          setTimeout(() => {
            let game = gameData.buildRecordData(record);
            game.id = id;
            game.created = record.created;
            userGames[id] = game;

            this.notifyListeners();
            resolve();
          }, MOCK_API_DELAY);
        } else {
          reject(`No Game found with id: ${id}.`);
        }
      } else {
        reject('Not logged in'); // not logged in; reject immediately
      }
    });
  }

  /** Destroys an existing record from the DB */
  static destroyRecord(record) {
    console.log('MOCK GAME API: using mock API -> destroyRecord()');
    if (auth.isLoggedIn()) {
      let userGames = games[auth.user().uid.toString()];

      if (userGames[record.id]) {
        return new Promise((resolve) => {
          setTimeout(() => {
            delete userGames[record.id];
            this.notifyListeners();
            resolve();
          }, MOCK_API_DELAY);
        });
      }
    }
  }

  /** Adds a listener to db state change events. */
  static addDbListener(callback) {
    console.log('MOCK GAME API: using mock API -> addDbListener()');
    listeners.push(callback);
    callback({
      val: function() {
        return games[auth.user().uid.toString()];
      }
    });
  }

  /** Calls all registered state change listeners */
  static notifyListeners() {
    console.log('MOCK GAME API: using mock API -> notifyListeners()');
    each(listeners, callback => {
      callback({
        val: function() {
          return games[auth.user().uid.toString()];
        }
      });
    });
  }

  /** Adds a listener to db state change events. */
  static removeDbListener(callback) {
    console.log('MOCK GAME API: using mock API -> removeDbListener()');
    listeners = [];
  }
}

export default GameApiMock;
