import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import * as actions from '../../profile/profileActions';
import goto from '../../../utils/goto';
import UserInfo from '../components/UserInfo';
import ProfileForm from '../components/ProfileForm';

import {USE_MOCK_APIS} from '../../../constants/env';
import authApi from '../../auth/authApi';
import authApiMock from '../../auth/authApiMock';


const api = USE_MOCK_APIS ? authApiMock : authApi;


class AccountPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    let waitingForProfile = !props.profile.name;
    this.state = {
      profile: Object.assign({}, props.profile), // unedited, original profile (i.e. for dirty-checking)
      profileCopy: Object.assign({}, props.profile), // profile being edited (when in editing state)
      profileIsDirty: false, // whether the editing profile differs from original
      working: waitingForProfile, // whether we are processing an AJAX call
      editing: false, // whether we are in editing mode (i.e. or just viewing)
      errors: {}, // validation errors (if any)
      apiError: '' // error message returned from API (if any)
    };

    this.enterEditingState = this.enterEditingState.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSaveEdits = this.onSaveEdits.bind(this);
    this.onCancelEdits = this.onCancelEdits.bind(this);
    this.onSignout = this.onSignout.bind(this);
  }

  componentWillMount() {
    // redirect to login page if user is not logged in
    if (!api.isLoggedIn()) {
      this.redirectToLoginPage();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      this.setState({
        working: false,
        profile: Object.assign({}, nextProps.profile)
      });
    }
  }

  redirectToLoginPage() {
    goto.route('/account/login');
  }

  /** Sets the current view to 'profile editing' state; saves the current profile for dirty-checking. */
  enterEditingState() {
    this.setState({
      editing: true,
      profileCopy: Object.assign({}, this.state.profile)
    });
  }

  /** Checks if the profile currently has unsaved edits */
  checkIfProfileIsDirty() {
    let profileIsDirty = false;

    // compare profile 'name' properties
    let nameOrig = this.state.profileCopy.name;
    let nameNew = this.state.profile.name;
    if (nameNew && nameNew !== nameOrig) {
      profileIsDirty = true;
    }

    this.setState({ profileIsDirty });
  }

  /*==============================================
   = Event Handlers
   ==============================================*/
  /** Handler for ProfileForm change events; updates the current profile details. */
  onChange(event) {
    event.preventDefault();
    let profile = this.state.profile;
    let key = event.target.name;
    profile[key] = event.target.value;
    this.setState({ profile });
    this.checkIfProfileIsDirty();
  }

  /** Handler for clicking the 'Update' button; enters 'profile editing' state. */
  onUpdateClick(event) {
    event.preventDefault();
    this.enterEditingState();
  }

  /** Attempts to save the edited profile to the DB */
  onSaveEdits(event) {
    event.preventDefault();
    if (this.isValid()) {
      // clear any existing errors before submitting
      this.setState({
        working: true,
        errors: {},
        apiError: ''
      });

      this.props.actions.updateProfile(this.state.profile)
        .then(res => {
          // exit editing state upon success
          this.setState({
            working: false,
            editing: false
          });
          toastr.success('Profile updated', 'Success');
        }, err => {
          // display error message if received, but not leave editing state
          this.setState({
            working: false,
            apiError: err.message
          });
          toastr.error('Error updating profile', 'Error');
        });
    }
  }

  /** Handler for 'Cancel' button in edit state; leaves editing state. */
  onCancelEdits(event) {
    event.preventDefault();
    this.setState({ editing: false });
  }

  /** Handler for 'Logout' button; ends the current session. */
  onSignout(event) {
    event.preventDefault();
    this.setState({ working: true });

    api.signOut()
      .then(() => {
        this.setState({ working: false });
        goto.route('/account/login');
        toastr.info('Logged out', 'Success');
      });
  }

  /*=============================================
   = validation
   =============================================*/
  isValid() {
    let valid = true;
    return valid;
  }

  /*==============================================
   = Render
   ==============================================*/
  render() {
    const {editing} = this.state;
    return (
      <div>
        {/* user info display (i.e. non-editing state) */}
        {!editing &&
          <section>
            <UserInfo
              user={this.props.user}
              profile={this.state.profile}
              />

            <button
              className="success"
              onClick={this.onUpdateClick}
              disabled={this.state.working}>
              Update
            </button>&nbsp;

            <button
              onClick={this.onSignout}
              disabled={this.state.working}>
              Logout
            </button>
          </section>
        }

        {/* user edit form (i.e. editing state) */}
        {editing &&
          <section>
            <ProfileForm
              working={this.state.working}
              user={this.props.user}
              profile={this.state.profile}
              errors={this.state.errors}
              apiError={this.state.apiError}
              onChange={this.onChange}
              />

            <button
              onClick={this.onSaveEdits}
              disabled={this.state.working || !this.state.profileIsDirty}>
              Save
            </button>&nbsp;

            <button
              className="pseudo"
              onClick={this.onCancelEdits}
              disabled={this.state.working}>
              Cancel
            </button>
          </section>
        }
      </div>
    );
  }
}

AccountPage.propTypes = {
  actions: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: !!state.user.email,
    user: state.user,
    profile: state.profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
