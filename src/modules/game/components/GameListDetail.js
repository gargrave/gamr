import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import dateHelper from '../../../utils/dateHelper';


const GameListDetail = ({game, altRow}) => {
  function getClass() {
    if (altRow) {
      return 'list-group-item list-group-alt-row';
    }
    return 'list-group-item';
  }

  return (
    <Link to={`/game/${game.id}`} className={getClass()}>
      <span className="badge">{game.dates.length}</span>
      <strong>{game.name}</strong>
      <br/>
      <span className="text-muted">
        Last played: {dateHelper.timeAgoString(game.lastPlayed)}
      </span>
    </Link>
  );
};

GameListDetail.propTypes = {
  game: PropTypes.object.isRequired,
  altRow: PropTypes.bool,
};

export default GameListDetail;
