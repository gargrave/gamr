import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';


const SideNav = ({loggedIn}) => {
  return (
    <ul>
      <li><IndexLink to="/">Home</IndexLink></li>
      {loggedIn &&
        <span>
          <li><Link to="/game">Games</Link></li>
          <li><Link to="/platform">Platforms</Link></li>
        </span>
      }
      <li><Link to="/account">Account</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  );
};

SideNav.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

export default SideNav;
