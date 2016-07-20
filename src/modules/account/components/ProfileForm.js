import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import TextInput from '../../common/components/TextInput';


const ProfileForm = ({working, user, profile, profileIsDirty,
  errors, apiError, onChange, onSave, onCancel}) => {
  return (
    <div>
      <h2>Update Profile</h2>

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

        <input
          type="submit"
          value="Submit"
          className="button"
          onClick={onSave}
          disabled={working || !profileIsDirty}
          />&nbsp;

        {!working &&
          <button
            className="pseudo"
            onClick={onCancel}
            disabled={working}>
            Cancel
          </button>
        }
      </form>
    </div>
  );
};

ProfileForm.propTypes = {
  working: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  profileIsDirty: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  apiError: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ProfileForm;
