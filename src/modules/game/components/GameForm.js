import React, {PropTypes} from 'react';

import TextInput from '../../common/components/TextInput';
import GameDatesList from './GameDatesList';


const GameForm = ({game, working, errors, gameIsDirty,
  onChange, onCheckChange, onSubmit, onCancel}) => {
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

      {/* list of dates for this game
      <GameDatesList
        dates={game.dates}
        />
      <hr/>*/}

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
        <button
          className="btn btn-default"
          disabled={working}
          onClick={onCancel}
          >Cancel
        </button>
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
  onCancel: PropTypes.func.isRequired
};

export default GameForm;
