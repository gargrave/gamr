import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import bootstrap from 'bootstrap';

import FirebaseContainer from './modules/firebase/FirebaseContainer';
import Navbar from './modules/layout/components/Navbar';
import SideNav from './modules/layout/components/SideNav';


class App extends React.Component {
  render() {
    return (
      <div>
        <FirebaseContainer />
        <Navbar
          location={this.props.location}
          user={this.props.user}
        />

        <div className="container">

          <aside className="col-md-2 col-md-offset-1 hidden-sm hidden-xs">
            <div className="row">
              <h4>Navigation</h4>
              <SideNav
                location={this.props.location}
                loggedIn={!!this.props.user.email}
              />
            </div>
          </aside>

          <main className="col-md-8">
            <div className="row">
              {this.props.children}
            </div>
          </main>

        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
