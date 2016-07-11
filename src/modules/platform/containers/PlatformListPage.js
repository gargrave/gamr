import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../platformActions';
import goto from '../../../utils/goto';
import PlatformList from '../components/PlatformList';


class PlatformListPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToPlatformCreatePage = this.redirectToPlatformCreatePage.bind(this);
  }

  redirectToPlatformCreatePage() {
    goto.route('/platform/new');
  }

  /*=============================================
   = Render
   =============================================*/
  render() {
    return (
      <div>
        <h2>Platforms</h2>

        <button
          className="button success"
          onClick={this.redirectToPlatformCreatePage}
          >Add a Platform
        </button>

        <PlatformList
          platforms={this.props.platforms}
          />
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
