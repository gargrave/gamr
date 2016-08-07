import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import TextInput from '../../common/components/TextInput';


const ProfileForm = ({working, user, profile, profileIsDirty,
  errors, apiError, onChange, onSave, onCancel}) => {
  return (
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
        className="btn btn-success"
        onClick={onSave}
        disabled={working || !profileIsDirty}
        />&nbsp;

      <button
        className="btn btn-default"
        onClick={onCancel}
        disabled={working}>
        Cancel
      </button>
    </form>
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
