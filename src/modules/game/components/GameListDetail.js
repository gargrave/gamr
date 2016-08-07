import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import dateHelper from '../../../utils/dateHelper';


const GameListDetail = ({game}) => {
  return (
    <Link to={`/game/${game.id}`} className="list-group-item">
      <span className="badge">{game.dates.length}</span>
      <strong>{game.name}</strong>
      <br/>
      <span className="text-muted">
        Last played: {game.dates.length ? dateHelper.timeAgoString(game.dates[0]) : 'Never'}
      </span>
    </Link>
  );
};

GameListDetail.propTypes = {
  game: PropTypes.object.isRequired
};

export default GameListDetail;
