import React, {PropTypes} from 'react';

import TextInput from '../../common/components/TextInput';


const PlatformForm = ({platform, working, onChange, onSubmit, onCancel, errors}) => {
  return (
    <form>
      <TextInput
        label="Platform Name"
        name="name"
        value={platform.name}
        placeholder="First Name"
        onChange={onChange}
        error={errors.name}
        />

      <input
        type="submit"
        value="Submit"
        disabled={working}
        onClick={onSubmit}
        />&nbsp;

      {!working &&
        <button
          className="button pseudo"
          disabled={working}
          onClick={onCancel}
          >Cancel
        </button>
      }
    </form>
  );
};

PlatformForm.propTypes = {
  platform: PropTypes.object.isRequired,
  working: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default PlatformForm;
