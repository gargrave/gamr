import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import {APP_TITLE} from '../../../constants/appConfig';


const Navbar = ({user, location}) => {
  function getActiveClass(path) {
    return path == location.pathname ? 'active' : '';
  }

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
          {!!user.email &&
            <ul className="nav navbar-nav">
              <li className={getActiveClass('/game')}>
                <Link to="/game">Games</Link>
              </li>
              <li className={getActiveClass('/platform')}>
                <Link to="/platform">Platforms</Link>
              </li>
            </ul>
          }

          {/* account/profile dropdown, when user is logged in */}
          {!!user.email &&
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                  aria-haspopup="true" aria-expanded="false">{user.email} <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">

                  <li className={getActiveClass('/account')}>
                    <Link to="/account">
                      <span className="glyphicon glyphicon-user"></span>&nbsp; &nbsp;
                      Profile
                    </Link>
                  </li>

                  <li>
                    <a href="#">
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
              <li className={getActiveClass('/game')}>
                <Link to="/account/login">Login</Link>
              </li>
            </ul>
          }

        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Navbar;
