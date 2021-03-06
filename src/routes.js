import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import HomePage from './modules/common/HomePage';
import AboutPage from './modules/common/AboutPage.js';
import NotFoundPage from './modules/common/NotFoundPage.js';

import GameListPage from './modules/game/containers/GameListPage';
import GameCreatePage from './modules/game/containers/GameCreatePage';
import GameDetailPage from './modules/game/containers/GameDetailPage';
import GameEditPage from './modules/game/containers/GameEditPage';

import PlatformListPage from './modules/platform/containers/PlatformListPage';
import PlatformDetailPage from './modules/platform/containers/PlatformDetailPage';
import PlatformCreatePage from './modules/platform/containers/PlatformCreatePage';
import PlatformEditPage from './modules/platform/containers/PlatformEditPage';

import AccountPage from './modules/account/containers/AccountPage';
import LoginPage from './modules/account/containers/LoginPage';
import CreateAccountPage from './modules/account/containers/CreateAccountPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>

    <Route path="game" component={GameListPage}/>
    <Route path="game/new" component={GameCreatePage}/>
    <Route path="game/:id" component={GameDetailPage}/>
    <Route path="game/:id/edit" component={GameEditPage}/>

    <Route path="platform" component={PlatformListPage}/>
    <Route path="platform/new" component={PlatformCreatePage}/>
    <Route path="platform/:id" component={PlatformDetailPage}/>
    <Route path="platform/:id/edit" component={PlatformEditPage}/>

    <Route path="account" component={AccountPage}/>
    <Route path="account/login" component={LoginPage}/>
    <Route path="account/create" component={CreateAccountPage}/>

    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
