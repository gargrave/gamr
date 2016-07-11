import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import TextInput from '../../common/components/TextInput';


const ProfileForm = ({working, user, profile, errors, apiError, onChange}) => {
  return (
    <div>
      <h1>Update Profile</h1>

      {apiError &&
        <div className="alert alert-danger">Error: {apiError}</div>
      }

      <form>
        <TextInput
          label="Name"
          value={profile.name}
          placeholder="Name"
          name="name"
          onChange={onChange}
          />
      </form>
    </div>
  );
};

ProfileForm.propTypes = {
  working: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  apiError: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ProfileForm;