import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import toastr from 'toastr';

import {APP_TITLE} from '../../../constants/appConfig';
import {AUTH_API} from '../../../constants/env';
import goto from '../../../utils/goto';


class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  getActiveClass(path) {
    return path == location.pathname ? 'active' : '';
  }

  /** Handler for 'Logout' button; ends the current session. */
  onLogoutClick(event) {
    event.preventDefault();

    this.setState({ working: true });
    AUTH_API.signOut()
      .then(() => {
        this.setState({ working: false });
        goto.route('/account/login');
        toastr.info('Logged out', 'Success');
      });
  }

  render() {
    const loggedIn = !!this.props.user.email;
    const {user, location} = this.props;

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">{APP_TITLE}</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            {/* primary nav links, when user is logged in */}
            {!!loggedIn &&
              <ul className="nav navbar-nav">
                <li className={this.getActiveClass('/game')}>
                  <Link to="/game">Games</Link>
                </li>
                <li className={this.getActiveClass('/platform')}>
                  <Link to="/platform">Platforms</Link>
                </li>
              </ul>
            }

            {/* account/profile dropdown, when user is logged in */}
            {!!loggedIn &&
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                    aria-haspopup="true" aria-expanded="false">{user.email} <span className="caret"></span>
                  </a>
                  <ul className="dropdown-menu">

                    <li className={this.getActiveClass('/account')}>
                      <Link to="/account">
                        <span className="glyphicon glyphicon-user"></span>&nbsp; &nbsp;
                        Profile
                      </Link>
                    </li>

                    <li>
                      <a href="" onClick={this.onLogoutClick}>
                        <span className="glyphicon glyphicon-log-out"></span>&nbsp; &nbsp;
                        Logout
                      </a>
                    </li>

                  </ul>
                </li>
              </ul>
            }

            {/* login link, when user is not logged in */}
            {!user.email &&
              <ul className="nav navbar-nav navbar-right">
                <li className={this.getActiveClass('/game')}>
                  <Link to="/account/login">Login</Link>
                </li>
              </ul>
            }

          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Navbar;
