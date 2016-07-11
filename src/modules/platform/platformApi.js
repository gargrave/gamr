import firebase from '../../etc/firebaseConfig';
import auth from '../auth/authApi';


const MODULE_NAME = 'platforms';
const DB = firebase.database();

const getUrlFor = function(user, obj) {
  return DB.ref(`${MODULE_NAME}/${user.uid}/${obj.id}`);
};

const buildRecordData = function(record) {
  let dateNow = new Date();
  return {
    name: record.name.trim(),
    created: dateNow.getTime(),
    modified: dateNow.getTime()
  };
};

let currentUserId = null;


class PlatformApi {
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
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let userId = auth.user().uid.toString();
        let dbRef = DB.ref(`${MODULE_NAME}/${userId}`);
        let newRecordData = buildRecordData(record);
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
        let platform = buildRecordData(record);
        platform.created = record.created;

        recordUrl.update(platform, err => {
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

export default PlatformApi;
