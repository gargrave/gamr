import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import * as actions from '../gameActions';
import {PLATFORM_API} from '../../../constants/env';
import gameData from '../gameData';
import goto from '../../../utils/goto';
import apiHelper from '../../../utils/apiHelper';
import dateHelper from '../../../utils/dateHelper';
import ActionCancelBtnGroup from '../../common/components/ActionCancelBtnGroup';
import ErrorAlert from '../../common/components/ErrorAlert';
import GameDetailBlock from '../components/GameDetailBlock';
import TodayButton from '../components/TodayButton';


class GameDetailPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    const showAddToday = this.showAddTodayPropsToState(props);

    this.state = {
      game: Object.assign({}, props.game),
      working: false,
      apiError: '',
      showAddToday
    };

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentWillMount() {
    // if we have an invalid game id, redirect back to list page
    if (!this.props.game.id) {
      this.redirectToListPage();
    }
  }

  componentWillReceiveProps(nextProps) {
    const showAddToday = this.showAddTodayPropsToState(nextProps);

    this.setState({
      showAddToday
    });
  }

  /*=============================================
   = state helper methods
   =============================================*/
  showAddTodayPropsToState(props) {
    return !!props.game.dates && !props.game.dates.includes(dateHelper.todayDateString());
  }

  refreshGameInState(_game) {
    let game = Object.assign({}, _game);
    game.platform = this.state.game.platform;
    game.lastPlayed = game.dates[0] || '';
    return game;
  }

  updateGame(game) {
    this.setState({ working: true });
    this.props.actions.updateGame(game)
      .then(res => {
        this.setState({
          game: this.refreshGameInState(game),
          working: false
        });
      }, err => {
        this.setState({
          working: false,
          apiError: err.message
        });
        toastr.error('Error updating game', 'Error');
      });
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
  onAddTodayClick() {
    let game = Object.assign({}, this.state.game);
    let dates = Object.assign([], this.state.game.dates);
    let today = dateHelper.todayDateString();

    if (!dates.includes(today)) {
      game.dates = dates.concat(today);
      game.platform = this.state.game.platform.id;
      this.updateGame(game);
    }
  }

  onRemoveTodayClick() {
    let game = Object.assign({}, this.state.game);
    let dates = Object.assign([], this.state.game.dates);
    let today = dateHelper.todayDateString();

    if (game.dates.includes(today)) {
      game.dates = dates.filter(d => d !== today);
      game.platform = this.state.game.platform.id;
      this.updateGame(game);
    }
  }

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
    const {working, game, apiError} = this.state;
    return (
      <div>
        <h3>{game.name}</h3>
        <hr/>

        {/* API error message display */}
        <ErrorAlert error={apiError} />

        {/* game details */}
        <GameDetailBlock working={working} game={game} />

        {/* 'add/remove today' button */}
        <TodayButton
          working={working}
          showAddToday={this.state.showAddToday}
          addToday={() => this.onAddTodayClick()}
          removeToday={() => this.onRemoveTodayClick()}
        />
        <br/>

        {/* edit/back buttons */}
        <ActionCancelBtnGroup
          working={working}
          onActionClick={() => this.redirectToEditPage()}
          onCancelClick={() => this.redirectToListPage()}
          actionText="Edit"
          cancelText="Back"
        />
        <hr/>

        <p><a href="" onClick={this.onDeleteClick}>Delete this game</a></p>
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
    game = gameData.getNewRecord();
  } else {
    game.platform = apiHelper.findRecordById(state.platforms, game.platform);
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
