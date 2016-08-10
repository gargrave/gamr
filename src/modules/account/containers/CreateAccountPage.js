import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr';

import {AUTH_API} from '../../../constants/env';
import goto from '../../../utils/goto';
import validate from '../../../utils/validate';
import CreateUserForm from '../components/CreateUserForm';


class CreateAccountPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.resetState();

    this.isValid = this.isValid.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirectToLoginPage = this.redirectToLoginPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.redirectToAccountPage();
    }
  }

  resetState() {
    this.state = {
      working: false,
      // user details for new users
      userData: {
        email: '',
        emailConfirm: '',
        pass: '',
        passConfirm: ''
      },
      // validation errors
      errors: {
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: ''
      },
      // server/ajax error
      apiError: ''
    };
  }

  redirectToAccountPage() {
    goto.route('/account');
  }

  redirectToLoginPage() {
    goto.route('/account/login');
  }

  /*==============================================
   = Validation
   ==============================================*/
  isValid(user) {
    let valid = true;
    let errors = {};
    let email = user.email;
    let emailConfirm = user.emailConfirm;
    let pass = user.pass;
    let passConfirm = user.passConfirm;

    // validate email
    let emailParams = { required: true, format: 'email' };
    let emailVal = validate(user.email, emailParams);
    if (!emailVal.valid) {
      errors.email = emailVal.error;
      valid = false;
    } else if (email !== emailConfirm) {
      errors.email = 'Emails do not match';
      errors.emailConfirm = errors.email;
      valid = false;
    }

    // validate password
    let passParams = { required: true, minLength: 6 };
    let passVal = validate(user.pass, passParams);
    if (!passVal.valid) {
      errors.password = passVal.error;
      valid = false;
    } else if (pass !== passConfirm) {
      errors.password = 'Passwords do not match';
      errors.passwordConfirm = errors.password;
      valid = false;
    }

    this.setState({ errors });
    return valid;
  }

  /*==============================================
   = Event Handlers
   ==============================================*/
  onChange(event) {
    event.preventDefault();
    let propKey = event.target.name;
    let user = this.state.userData;
    user[propKey] = event.target.value;
    this.setState({ user });
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.isValid(this.state.userData)) {
      let user = this.state.userData;
      this.setState({
        working: true,
        apiError: ''
      });

      AUTH_API.newUserWithEmail(user.email, user.pass)
        .then(() => {
          this.resetState();
          toastr.success('Account created', 'Success');
          this.redirectToAccountPage();
        })
        .catch(err => {
          this.setState({
            working: false,
            apiError: err.message
          });
          toastr.error('Error creating account', 'Error');
        });
    }
  }

  /*==============================================
   = Render
   ==============================================*/
  render() {
    return (
      <div>
        <CreateUserForm
          working={this.state.working}
          user={this.state.userData}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onGotoLogin={this.redirectToLoginPage}
          errors={this.state.errors}
          apiError={this.state.apiError}
          />
      </div>
    );
  }
}

CreateAccountPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: !!state.user.email
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountPage);
