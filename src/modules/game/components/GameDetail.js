import React, {PropTypes} from 'react';
import {Link} from 'react-router';


const GameDetail = ({game}) => {
  return (
    <article className="card">
      <header>
        <h3><Link to={`/game/${game.id}`}>{game.name}</Link></h3>
      </header>
      <p>
        created: {game.created}&nbsp;|
        updated: {game.modified}
      </p>
    </article>
  );
};

GameDetail.propTypes = {
  game: PropTypes.object.isRequired
};

export default GameDetail;
