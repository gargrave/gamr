import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import TextInput from '../../common/components/TextInput';
import PasswordInput from '../../common/components/PasswordInput';


const LoginForm = ({working, user, onChange, onSubmit, errors, apiError}) => {
  return (
    <div>
      <h3>Create an Account</h3>
      <hr/>

      {apiError &&
        <div className="alert alert-danger">{apiError}</div>
      }

      <form>
        <TextInput
          label="Email"
          value={user.email}
          placeholder="Email"
          name="email"
          onChange={onChange}
          error={errors.email}
          />

        <TextInput
          label="Confirm Email"
          value={user.emailConfirm}
          placeholder="Re-enter Email"
          name="emailConfirm"
          onChange={onChange}
          error={errors.emailConfirm}
          />

        <PasswordInput
          label="Password"
          value={user.pass}
          placeholder="Password"
          name="pass"
          onChange={onChange}
          error={errors.password}
          />

        <PasswordInput
          label="Confirm Password"
          value={user.passConfirm}
          placeholder="Confirm Password"
          name="passConfirm"
          onChange={onChange}
          error={errors.passwordConfirm}
          />

        <input
          type="submit"
          value="Submit"
          className="btn btn-success"
          onClick={onSubmit}
          disabled={working}
          />&nbsp;
      </form>
      <hr/>

      <Link to="/account/login">Existing users click here</Link>
    </div>
  );
};

LoginForm.propTypes = {
  working: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onGotoLogin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  apiError: PropTypes.string.isRequired
};

export default LoginForm;
