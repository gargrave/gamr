import React, {PropTypes} from 'react';

import SubmitCancelBtnGroup from '../../common/components/SubmitCancelBtnGroup';
import TextInput from '../../common/components/TextInput';


const PlatformForm = ({platform, working, errors, platformIsDirty,
  onChange, onSubmit, onCancel}) => {
  return (
    <form>
      <TextInput
        label="Platform Name"
        name="name"
        value={platform.name}
        placeholder="Platform Name"
        onChange={onChange}
        error={errors.name}
        />

      <SubmitCancelBtnGroup
        working={working}
        disableSubmit={!platformIsDirty}
        onSubmit={onSubmit}
        onCancelClick={onCancel}
      />
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
