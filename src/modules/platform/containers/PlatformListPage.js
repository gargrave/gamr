import React, {PropTypes} from 'react';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../platformActions';
import goto from '../../../utils/goto';
import PlatformList from '../components/PlatformList';


class PlatformListPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToCreatePage = this.redirectToCreatePage.bind(this);
  }

  redirectToCreatePage() {
    goto.route('/platform/new');
  }

  /*=============================================
   = Render
   =============================================*/
  render() {
    const {loggedIn} = this.props;
    return (
      <div>
        <h3>Platforms&nbsp;
          <button
            className="btn btn-success"
            onClick={this.redirectToCreatePage}>
            Add a Platform
          </button>
        </h3>
        <hr/>

        {!loggedIn &&
          <section>
            <h4>You are not logged in. Visit the <Link to="/account">Account Page</Link> to log in.</h4>
          </section>
        }

        {loggedIn &&
          <PlatformList platforms={this.props.platforms} />
        }
      </div>
    );
  }
}

PlatformListPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  platforms: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: !!state.user.email,
    user: state.user,
    platforms: state.platforms
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformListPage);
