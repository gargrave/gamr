import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import HomePage from './modules/common/HomePage';
import AboutPage from './modules/common/AboutPage.js';
import NotFoundPage from './modules/common/NotFoundPage.js';

import AccountPage from './modules/account/containers/AccountPage';
import LoginPage from './modules/account/containers/LoginPage';
import CreateAccountPage from './modules/account/containers/CreateAccountPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>

    <Route path="account" component={AccountPage}/>
    <Route path="account/login" component={LoginPage}/>
    <Route path="account/create" component={CreateAccountPage}/>

    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
