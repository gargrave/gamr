import React, {PropTypes} from 'react';

import GameListDetail from './GameListDetail';


const GameList = ({games}) => {
  let count = games.length;
  return (
    <div className="list-group">
      {/* message shown when user has no games */}
      {!count &&
        <h4>You have not added any games yet.</h4>
      }

      {/* list shown when user has 1 or more games */}
      {!!count && games.map(game =>
        <GameListDetail key={game.id} game={game}/>
      )}
    </div>
  );
};

GameList.propTypes = {
  games: PropTypes.array.isRequired
};

export default GameList;
