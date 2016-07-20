import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../auth/authActions';
import * as profileActions from '../profile/profileActions';
import * as platformActions from '../platform/platformActions';
import * as gameActions from '../game/gameActions';

import {USE_MOCK_APIS} from '../../constants/env';
import _authApi from '../auth/authApi';
import _authApiMock from '../auth/authApiMock';
import _profileApi from '../profile/profileApi';
import _profileApiMock from '../profile/profileApiMock';
import _platformApi from '../platform/platformApi';
import _platformApiMock from '../platform/platformApiMock';
import _gameApi from '../game/gameApi';
import _gameApiMock from '../game/gameApiMock';


const authApi = USE_MOCK_APIS ? _authApiMock : _authApi;
const profileApi = USE_MOCK_APIS ? _profileApiMock : _profileApi;
const platformApi = USE_MOCK_APIS ? _platformApiMock : _platformApi;
const gameApi = USE_MOCK_APIS ? _gameApiMock : _gameApi;


class Firebase extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onAuthStateChange = this.onAuthStateChange.bind(this);
    this.onProfileValueChange = this.onProfileValueChange.bind(this);
    this.onPlatformsValueChange = this.onPlatformsValueChange.bind(this);
    this.onGamesValueChange = this.onGamesValueChange.bind(this);
  }

  componentWillMount() {
    authApi.addAuthStateListener(this.onAuthStateChange);
  }

  onAuthStateChange(user) {
    if (user) {
      // if logged in, watch for changes to relavent databases
      profileApi.addDbListener(this.onProfileValueChange);
      platformApi.addDbListener(this.onPlatformsValueChange);
      gameApi.addDbListener(this.onGamesValueChange);
      this.props.authActions.loginSuccess(user);
    } else {
      // if logged out, clear all listeners
      profileApi.removeDbListener(this.onProfileValueChange);
      platformApi.removeDbListener(this.onPlatformsValueChange);
      gameApi.removeDbListener(this.onGamesValueChange);
      this.props.authActions.logoutSuccess();
    }
  }

  onProfileValueChange(snapshot) {
    this.props.profileActions.fetchProfileSuccess(snapshot.val());
  }

  onPlatformsValueChange(snapshot) {
    this.props.platformActions.fetchPlatformsSuccess(snapshot.val());
  }

  onGamesValueChange(snapshot) {
    this.props.gameActions.fetchGamesSuccess(snapshot.val());
  }

  render() {
    return (
      <span></span>
    );
  }
}

Firebase.propTypes = {
  authActions: PropTypes.object.isRequired,
  profileActions: PropTypes.object.isRequired,
  platformActions: PropTypes.object.isRequired,
  gameActions: PropTypes.object.isRequired
};

/*=============================================
 = Redux setup
 =============================================*/
function mapStateToProps(state, ownProps) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch),
    platformActions: bindActionCreators(platformActions, dispatch),
    gameActions: bindActionCreators(gameActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Firebase);
