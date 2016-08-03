import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import * as actions from '../gameActions';
import validate from '../../../utils/validate';
import goto from '../../../utils/goto';
import api from '../gameApi';
import GameForm from '../components/GameForm';


class GameCreatePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      game: Object.assign({}, props.game),
      working: false,
      errors: {},
      apiError: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onAddDate = this.onAddDate.bind(this);
    this.onRemoveDate = this.onRemoveDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  redirectToListPage() {
    goto.route('/game');
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
  }

  onCheckChange(event) {
    let propKey = event.target.name;
    let game = this.state.game;
    game[propKey] = event.target.checked;
    this.setState({ game });
  }

  onAddDate(date) {
    let game = this.state.game;
    game.dates.push(date);
    this.setState({ game });
  }

  onRemoveDate(date) {
    let game = this.state.game;
    game.dates = game.dates.filter((d) => d !== date);
    this.setState({ game });
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.isValid()) {
      this.setState({ working: true });
      this.props.actions.createGame(this.state.game)
        .then(res => {
          this.setState({ working: false });
          toastr.success('Game created', 'Success');
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
    this.redirectToListPage();
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
        <h3>Add a Game</h3>
        <hr/>

        {apiError &&
          <div className="alert alert-danger">Error: {apiError}</div>
        }

        <GameForm
          game={this.state.game}
          working={this.state.working}
          errors={this.state.errors}
          gameIsDirty={true}
          onChange={this.onChange}
          onCheckChange={this.onCheckChange}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          onAddDate={this.onAddDate}
          onRemoveDate={this.onRemoveDate}
        />
      </div>
    );
  }
}

GameCreatePage.propTypes = {
  actions: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

/*=============================================
 = Redux setup
 =============================================*/
function mapStateToProps(state, ownProps) {
  return {
    game: api.getNewRecord()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCreatePage);
