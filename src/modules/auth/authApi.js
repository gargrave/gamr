import firebase from 'firebase';

import profileApi from '../profile/profileApi';


const fbAuth = firebase.auth();


class AuthApi {
  /** @return {Object} - The current user data, or null if no user is logged in. */
  static user() {
    return fbAuth.currentUser;
  }

  /** @return {Boolean} - Whether the current user is authenticated. */
  static isLoggedIn() {
    return fbAuth.currentUser !== null;
  }

  /**
   * Attempts to create a new user with the provided details. If a user with the
   * specified email already exists, the Promise will be rejected. If the account
   * is created, the new user is logged in immediately.
   * @return {Promise} - Resolves with the new user data, or rejects if email is already in use.
   */
  static newUserWithEmail(email, pass) {
    return new Promise((resolve, reject) => {
      fbAuth.createUserWithEmailAndPassword(email.trim(), pass.trim())
        .then(user => {
          profileApi.createProfile(user)
            .then(profile => {
              resolve(user);
            }, err => {
              reject(err.message);
            });
        }, err => {
          reject(err);
        });
    });
  }

  /**
  * Attempts to login the current user with the details provided.
  * @return {Promise} - Resolves if the data authenticates, or rejects if does not.
  */
  static signInWithEmail(email, pass) {
    return fbAuth.signInWithEmailAndPassword(email.trim(), pass.trim());
  }

  /**
   * Clears the current user and authentication data.
   * @return {Promise} - Will always resolve with null after clearing current user.
   */
  static signOut() {
    return fbAuth.signOut();
  }

  /** Adds a listener to auth state change events. */
  static addAuthStateListener(callback) {
    fbAuth.onAuthStateChanged(user => {
      callback(user);
    });
  }
}

export default AuthApi;
