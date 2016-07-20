import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import * as actions from '../gameActions';
import validate from '../../../utils/validate';
import goto from '../../../utils/goto';
import apiHelper from '../../../utils/apiHelper';
import GameForm from '../components/GameForm';


class GameEditPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      game: Object.assign({}, props.game), // working game data
      gameCopy: Object.assign({}, props.game), // unedited, original game (i.e. for dirty-checking)
      gameIsDirty: false, // whether the editing game differs from original
      working: false,
      errors: {},
      apiError: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  redirectToListPage() {
    goto.route('/game');
  }

  redirectToDetailsPage() {
    let id = this.state.game.id;
    goto.route(`/game/${id}`);
  }

  /** Checks if the game currently has unsaved edits */
  checkIfgameIsDirty() {
    let gameIsDirty = false;

    // compare game 'name' properties
    let nameOrig = this.state.gameCopy.name;
    let nameNew = this.state.game.name;
    if (nameNew && nameNew !== nameOrig) {
      gameIsDirty = true;
    }

    this.setState({ gameIsDirty });
  }

  /*=============================================
   = event handlers
   =============================================*/
  onChange(event) {
    event.preventDefault();
    let propKey = event.target.name;
    let game = this.state.game;
    game[propKey] = event.target.value;
    this.setState({ game });
    this.checkIfgameIsDirty();
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ working: true });
      this.props.actions.updateGame(this.state.game)
        .then(res => {
          this.setState({ working: false });
          toastr.success('Game updated', 'Success');
          this.redirectToListPage();
        }, err => {
          this.setState({
            working: false,
            apiError: err.message
          });
          toastr.error('Error creating game', 'Error');
        });
    }
  }

  onCancel(event) {
    event.preventDefault();
    this.redirectToDetailsPage();
  }

  /*=============================================
   = validation
   =============================================*/
  isValid() {
    let valid = true;
    let game = this.state.game;
    let errors = {};

    // validate first name
    let nameParams = { required: true, minLength: 2 };
    let nameVal = validate(game.name, nameParams);
    if (!nameVal.valid) {
      errors.name = nameVal.error;
      valid = false;
    }

    this.setState({ errors });
    return valid;
  }

  render() {
    let {apiError} = this.state;
    return (
      <div>
        <h2>Edit Game: {this.props.game.name}</h2>

        {apiError &&
          <div className="alert alert-danger">Error: {apiError}</div>
        }

        <GameForm
          game={this.state.game}
          working={this.state.working}
          errors={this.state.errors}
          gameIsDirty={this.state.gameIsDirty}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          />
      </div>
    );
  }
}

GameEditPage.propTypes = {
  actions: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let gameId = ownProps.params.id;
  let game = apiHelper.findRecordById(state.games, gameId);

  return {
    game
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameEditPage);
