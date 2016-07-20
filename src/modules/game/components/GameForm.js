import React, {PropTypes} from 'react';

import TextInput from '../../common/components/TextInput';


const GameForm = ({game, working, errors, gameIsDirty,
  onChange, onCheckChange, onSubmit, onCancel}) => {
  return (
    <form>
      <TextInput
        label="Game Name"
        name="name"
        value={game.name}
        placeholder="First Name"
        onChange={onChange}
        error={errors.name}
        />

      <label>
        <input
          type="checkbox"
          name="finished"
          defaultChecked={game.finished}
          onChange={onCheckChange}
          />
        <span className="checkable">Finished</span>
      </label>
      <br/>

      <input
        type="submit"
        value="Submit"
        disabled={working || !gameIsDirty}
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
