import React, {PropTypes} from 'react';

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
        onChange={onChange}
        error={errors.platform}
      />

      <ul className="list-group">
        <GameDatesList
          dates={game.dates}
          working={working}
          editable={true}
          onAddDate={onAddDate}
          onRemoveDate={onRemoveDate}
        />
      </ul>

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

      <input
        type="submit"
        value="Submit"
        className="btn btn-success"
        disabled={working || !gameIsDirty}
        onClick={onSubmit}
      />&nbsp;

      {!working &&
        <span
          className="btn btn-default"
          disabled={working}
          onClick={onCancel}
          >Cancel
        </span>
      }
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
