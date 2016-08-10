/* eslint-disable no-console */
import firebase from 'firebase';
import _ from 'lodash';

import {MOCK_API_DELAY, MOCK_API_AUTO_LOGIN} from '../../constants/env';
import profileApiMock from '../profile/profileApiMock';


/** Currently logged-in user (null when no user is logged in) */
let currentUser = null;
/** Next id for new mock users */
let userId = 0;
/** Mock user database */
let users = [
  {
    uid: (userId++).toString(),
    email: 'dude@asdf.com',
    emailVerified: false,
    displayName: 'dude',
    isAnonymous: false,
    photoURL: ''
  },
  {
    uid: (userId++).toString(),
    email: 'bobsmith@mockemail.com',
    emailVerified: false,
    displayName: 'bobsmi',
    isAnonymous: false,
    photoURL: ''
  }
];
/** Auth state change listeners; this is to mock the real-time nature of firebase. */
let listeners = [];


class AuthApiMock {
  /** @return {Object} - The current user data, or null if no user is logged in. */
  static user() {
    console.log('MOCK AUTH API: using mock API -> user()');
    return currentUser;
  }

  /** @return {Boolean} - Whether the current user is authenticated. */
  static isLoggedIn() {
    console.log('MOCK AUTH API: using mock API -> isLoggedIn()');
    return currentUser !== null;
  }

  /**
   * Attempts to create a new user with the provided details. If a user with the
   * specified email already exists, the Promise will be rejected. If the account
   * is created, the new user is logged in immediately.
   * @return {Promise} - Resolves with the new user data, or rejects if email is already in use.
   */
  static newUserWithEmail(email, pass) {
    console.log('MOCK AUTH API: using mock API -> newUserWithEmail()');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user = _.find(users, user => {
          return user.email === email.trim();
        });

        if (user) {
          reject({ message: 'A user with this email already exists.' });
        } else {
          let newUser = {
            uid: (userId++).toString(),
            email: email.trim(),
            emailVerified: false,
            displayName: '',
            isAnonymous: false,
            photoURL: ''
          };
          users.push(newUser);
          currentUser = newUser;
          profileApiMock.createProfile(currentUser)
            .then(profile => {
              this.notifyListeners();
              resolve(newUser);
            });
        }
      }, MOCK_API_DELAY);
    });
  }

  /**
   * Attempts to login the current user with the details provided.
   * @return {Promise} - Resolves if the data authenticates, or rejects if does not.
   */
  static signInWithEmail(email, pass) {
    console.log('MOCK AUTH API: using mock API -> signInWithEmail()');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user = _.find(users, _user => {
          return _user.email === email.trim();
        });

        if (user) {
          currentUser = user;
          this.notifyListeners();
          resolve(user);
        } else {
          reject({ message: 'No user found with this email address.' });
        }
      }, MOCK_API_DELAY);
    });
  }

  /**
   * Clears the current user and authentication data.
   * @return {Promise} - Will always resolve with null after clearing current user.
   */
  static signOut() {
    console.log('MOCK AUTH API: using mock API -> signOut()');
    return new Promise((resolve) => {
      setTimeout(() => {
        currentUser = null;
        this.notifyListeners();
        resolve(null);
      }, MOCK_API_DELAY / 2);
    });
  }

  /** Adds a listener to auth state change events. This listener will be called once immediately to mock Firebase's behavior. */
  static addAuthStateListener(callback) {
    console.log('MOCK AUTH API: using mock API -> addAuthStateListener()');
    if (MOCK_API_AUTO_LOGIN) {
      console.log('MOCK AUTH API: auto log in enabled');
      currentUser = users[0];
    }
    listeners.push(callback);
    callback(currentUser);
  }

  /** Calls all registered auth state change listeners with the the current user */
  static notifyListeners() {
    console.log('MOCK AUTH API: using mock API -> notifyListeners()');
    _.each(listeners, listener => {
      listener(currentUser);
    });
  }
}

export default AuthApiMock;
