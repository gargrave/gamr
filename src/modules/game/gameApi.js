import firebase from '../../etc/firebaseConfig';
import auth from '../auth/authApi';

import gameData from './gameData';


const MODULE_NAME = 'games';
const DB = firebase.database();

const getUrlFor = function(user, obj) {
  return DB.ref(`${MODULE_NAME}/${user.uid}/${obj.id}`);
};

let currentUserId = null;


class GameApi {
  /** Creates and saves a new record to the DB. */
  static createRecord(record) {
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let userId = auth.user().uid.toString();
        let dbRef = DB.ref(`${MODULE_NAME}/${userId}`);
        let newRecordData = gameData.buildRecordData(record);
        let newRecordRef = dbRef.push();

        newRecordRef.set(newRecordData, err => {
          if (err) {
            reject(err);
          } else {
            dbRef.limitToLast(1).once('value', snapshot => {
              resolve(snapshot.val());
            });
          }
        });
      } else {
        reject('Not logged in'); // not logged in; reject immediately
      }
    });
  }

  /** Updates an existing record in the DB. */
  static updateRecord(record) {
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let recordUrl = getUrlFor(auth.user(), record);
        let game = gameData.buildRecordData(record);
        game.created = record.created;

        recordUrl.update(game, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } else {
        reject('Not logged in'); // not logged in; reject immediately
      }
    });
  }

  /** Destroys an existing record from the DB */
  static destroyRecord(record) {
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let recordUrl = getUrlFor(auth.user(), record);

        recordUrl.remove()
          .then(function() {
            resolve();
          })
          .catch(function(err) {
            reject(err);
          });
      } else {
        reject('Not logged in'); // not logged in; reject immediately
      }
    });
  }

  /** Adds a listener to db state change events. */
  static addDbListener(callback) {
    currentUserId = auth.user().uid.toString();
    DB.ref(`${MODULE_NAME}/${currentUserId}`).on('value', callback);
  }

  /** Removes a listener to db state change events. */
  static removeDbListener(callback) {
    DB.ref(`${MODULE_NAME}/${currentUserId}`).off('value', callback);
  }
}

export default GameApi;
