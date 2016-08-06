import React, {Component, PropTypes} from 'react';

import dateHelper from '../../../utils/dateHelper';
import filters from '../../../utils/filters';
import GameDatesList from './GameDatesList';


class GameDetailBlock extends Component {
  render() {
    const {game} = this.props;
    return (
      <span>
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Platform: </strong>{game.platform.name}
          </li>

          <li className="list-group-item">
            <strong>Last played: </strong>{dateHelper.fromDateString(game.dates[0])}
          </li>

          <li className="list-group-item">
            <strong>Finished: </strong>{filters.bool(game.finished.toString())}
          </li>
        </ul>

        <GameDatesList
            dates={game.dates}
          />
      </span>
    );
  }
}

GameDetailBlock.propTypes = {
  working: PropTypes.bool.isRequired,
  game: PropTypes.object.isRequired,
};

export default GameDetailBlock;
