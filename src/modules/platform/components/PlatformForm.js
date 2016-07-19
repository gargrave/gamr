import React, {PropTypes} from 'react';

import TextInput from '../../common/components/TextInput';


const PlatformForm = ({platform, working, errors, platformIsDirty,
  onChange, onSubmit, onCancel}) => {
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
        disabled={working || !platformIsDirty}
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
  errors: PropTypes.object.isRequired,
  platformIsDirty: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default PlatformForm;
