import firebase from '../../etc/firebaseConfig';
import auth from '../auth/authApi';
import profileData from './profileData';


const MODULE_NAME = 'profiles';
const DB = firebase.database();

const getUrlFor = function(user, obj) {
  return DB.ref(`${MODULE_NAME}/${user.uid}`);
};

let currentUserId = null;


class ProfileApi {
  /** Creates and saves a new record to the DB. */
  static createProfile(user) {
    return new Promise((resolve, reject) => {
      let dbRef = DB.ref(`${MODULE_NAME}/${user.uid}`);
      let newRecordData = profileData.getNewRecord();

      dbRef.set(newRecordData, err => {
        if (err) {
          reject(err);
        } else {
          dbRef.limitToLast(1).once('value', snapshot => {
            resolve(snapshot.val());
          });
        }
      });
    });
  }

  /** Updates an existing record in the DB. */
  static updateRecord(record) {
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let recordUrl = getUrlFor(auth.user(), record);

        // make sure we don't send the record with an id field, since the server already knows it
        if (record.hasOwnProperty('id')) {
          delete record.id;
        }

        recordUrl.update(record, err => {
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

export default ProfileApi;
