import React, {PropTypes} from 'react';

import SubmitCancelBtnGroup from '../../common/components/SubmitCancelBtnGroup';
import TextInput from '../../common/components/TextInput';
import PlatformDropdown from '../../platform/components/PlatformDropdown';
import GameDatesList from './GameDatesList';


const GameForm = ({
    game, working, errors, gameIsDirty,
    onChange, onCheckChange, onSubmit,
    onCancel, onAddDate, onRemoveDate}) => {
  return (
    <form>
      {/* game title input */}
      <TextInput
        label="Title"
        name="name"
        value={game.name}
        placeholder="Game Title"
        onChange={onChange}
        error={errors.name}
      />

      <PlatformDropdown
        platform={game.platform}
        onChange={onChange}
        error={errors.platform}
      />

      <GameDatesList
        dates={game.dates}
        working={working}
        editable={true}
        onAddDate={onAddDate}
        onRemoveDate={onRemoveDate}
      />

      {/* 'finished' checkbox */}
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            name="finished"
            defaultChecked={game.finished}
            onChange={onCheckChange}
          /> Finished
        </label>
      </div>

      <SubmitCancelBtnGroup
        working={working}
        disableSubmit={!gameIsDirty}
        onSubmit={onSubmit}
        onCancelClick={onCancel}
      />
    </form>
  );
};

GameForm.propTypes = {
  game: PropTypes.object.isRequired,
  working: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  gameIsDirty: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onCheckChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAddDate: PropTypes.func.isRequired,
  onRemoveDate: PropTypes.func.isRequired
};

export default GameForm;
