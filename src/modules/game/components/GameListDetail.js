import React, {PropTypes} from 'react';
import {Link} from 'react-router';


const GameListDetail = ({game}) => {
  return (
    <Link to={`/game/${game.id}`} className="list-group-item">
      <span className="badge">{game.dates.length}</span>
      <strong>{game.name}</strong>
    </Link>
  );
};

GameListDetail.propTypes = {
  game: PropTypes.object.isRequired
};

export default GameListDetail;
