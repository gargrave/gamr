import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as actions from '../gameActions';

import {GAME_API} from '../../../constants/env';
import goto from '../../../utils/goto';
import apiHelper from '../../../utils/apiHelper';
import GameList from '../components/GameList';


class GameDetailPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      game: Object.assign({}, props.game),
      working: false,
      apiError: ''
    };

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.redirectToEditPage = this.redirectToEditPage.bind(this);
  }

  componentWillMount() {
    // if we have an invalid game id, redirect back to list page
    if (!this.props.game.id) {
      this.redirectToListPage();
    }
  }

  /*=============================================
   = routing
   =============================================*/
  redirectToListPage() {
    goto.route('/game');
  }

  redirectToEditPage() {
    let id = this.state.game.id;
    goto.route(`/game/${id}/edit`);
  }

  /*=============================================
   = event handlers
   =============================================*/
  onDeleteClick(event) {
    event.preventDefault();

    if (!this.state.working && confirm('Delete this game?')) {
      this.setState({ working: true });
      this.props.actions.deleteGame(this.props.game)
        .then(() => {
          this.setState({ working: false });
          toastr.success('Game deleted', 'Success');
          this.redirectToListPage();
        }, err => {
          this.setState({
            working: false,
            apiError: err.message
          });
          toastr.error('Error deleting game', 'Error');
        });
    }
  }

  render() {
    const {game, working, apiError} = this.state;
    return (
      <div>
        <h2>Game Detail</h2>

        {apiError &&
          <div className="alert alert-danger">Error: {apiError}</div>
        }

        <p><strong>Name: </strong>{game.name}</p>
        <p><strong>Times played: </strong>{game.dates.length}</p>
        <p><strong>Last played: </strong>{game.dates[0]}</p>
        <p><strong>Finished: </strong>{game.finished.toString()}</p>

        <button
          disabled={working}
          onClick={this.redirectToEditPage}>
          Edit
        </button>&nbsp;

        {!working &&
          <button className="pseudo" onClick={this.redirectToListPage}>Back</button>
        }

        <p>
          <a href="" onClick={this.onDeleteClick}>Delete this game</a>
        </p>
      </div>
    );
  }
}

GameDetailPage.propTypes = {
  actions: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let gameId = ownProps.params.id;
  let game = apiHelper.findRecordById(state.games, gameId);
  if (!game) {
    game = GAME_API.getNewRecord();
  }

  return {
    game
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetailPage);