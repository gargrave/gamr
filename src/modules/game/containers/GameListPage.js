import React, {PropTypes} from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../gameActions';
import goto from '../../../utils/goto';
import GameList from '../components/GameList';


class GameListPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToCreatePage = this.redirectToCreatePage.bind(this);
  }

  redirectToCreatePage() {
    goto.route('/game/new');
  }

  /*=============================================
   = Render
   =============================================*/
  render() {
    const {loggedIn} = this.props;
    return (
      <div>
        <h3>Games &nbsp;
          {loggedIn &&
            <button
              className="btn btn-success"
              onClick={this.redirectToCreatePage}>
              Add a Game
            </button>
          }
        </h3>
        <hr/>

        {!loggedIn &&
          <section>
            <h4>You are not logged in. Visit the <Link to="/account">Account Page</Link> to log in.</h4>
          </section>
        }

        {loggedIn &&
          <GameList games={this.props.games} />
        }
      </div>
    );
  }
}

GameListPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  games: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: !!state.user.email,
    user: state.user,
    games: state.games
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameListPage);
