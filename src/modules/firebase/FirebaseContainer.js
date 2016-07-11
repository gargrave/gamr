import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from '../auth/authActions';
import * as profileActions from '../profile/profileActions';
import * as platformActions from '../platform/platformActions';

import {USE_MOCK_APIS} from '../../constants/env';
import _authApi from '../auth/authApi';
import _authApiMock from '../auth/authApiMock';
import _profileApi from '../profile/profileApi';
import _profileApiMock from '../profile/profileApiMock';
import _platformApi from '../platform/platformApi';
import _platformApiMock from '../platform/platformApiMock';


const authApi = USE_MOCK_APIS ? _authApiMock : _authApi;
const profileApi = USE_MOCK_APIS ? _profileApiMock : _profileApi;
const platformApi = USE_MOCK_APIS ? _platformApiMock : _platformApi;


class Firebase extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onAuthStateChange = this.onAuthStateChange.bind(this);
    this.onProfileValueChange = this.onProfileValueChange.bind(this);
    this.onPlatformsValueChange = this.onPlatformsValueChange.bind(this);
  }

  componentWillMount() {
    authApi.addAuthStateListener(this.onAuthStateChange);
  }

  onAuthStateChange(user) {
    if (user) {
      // if logged in, watch for changes to relavent databases
      profileApi.addDbListener(this.onProfileValueChange);
      platformApi.addDbListener(this.onPlatformsValueChange);
      this.props.authActions.loginSuccess(user);
    } else {
      // if logged out, clear all listeners
      profileApi.removeDbListener(this.onProfileValueChange);
      platformApi.removeDbListener(this.onPlatformsValueChange);
      this.props.authActions.logoutSuccess();
    }
  }

  onProfileValueChange(snapshot) {
    this.props.profileActions.fetchProfileSuccess(snapshot.val());
  }

  onPlatformsValueChange(snapshot) {
    this.props.platformActions.fetchPlatformsSuccess(snapshot.val());
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
  platformActions: PropTypes.object.isRequired
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
    platformActions: bindActionCreators(platformActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Firebase);
