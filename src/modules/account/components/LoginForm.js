import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import TextInput from '../../common/components/TextInput';
import PasswordInput from '../../common/components/PasswordInput';


const LoginForm = ({working, user, onChange, onSubmit, errors, apiError}) => {
  return (
    <div>
      <h3>Login</h3>
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

        <PasswordInput
          label="Password"
          value={user.pass}
          placeholder="Password"
          name="pass"
          onChange={onChange}
          error={errors.password}
          />

        <input
          type="submit"
          value="Submit"
          className="btn btn-primary"
          onClick={onSubmit}
          disabled={working}
          />&nbsp;
      </form>
      <hr/>

      <Link to="/account/create">New users click here</Link>
    </div>
  );
};

LoginForm.propTypes = {
  working: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  apiError: PropTypes.string.isRequired
};

export default LoginForm;
