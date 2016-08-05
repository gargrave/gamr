import React, {Component, PropTypes} from 'react';

import dateHelper from '../../../utils/dateHelper';
import GameDatesList from './GameDatesList';


class GameDetailBlock extends Component {
  render() {
    const {game} = this.props;
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Platform: </strong>{game.platform.name}
        </li>

        <GameDatesList
          dates={game.dates}
          working={this.props.working}
          editable={false}
          />

        <li className="list-group-item">
          <strong>Last played: </strong>{dateHelper.fromDateString(game.dates[0])}
        </li>

        <li className="list-group-item">
          <strong>Finished: </strong>{game.finished.toString()}
        </li>
      </ul>
    );
  }
}

GameDetailBlock.propTypes = {
  working: PropTypes.bool.isRequired,
  game: PropTypes.object.isRequired,
};

export default GameDetailBlock;
