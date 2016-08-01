import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';


const SideNav = ({location}) => {
  return (
    <ul>
      <li><IndexLink to="/">Home</IndexLink></li>
      <li><Link to="/game">Games</Link></li>
      <li><Link to="/platform">Platforms</Link></li>
      <li><Link to="/account">Account</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  );
};

SideNav.propTypes = {
  location: PropTypes.object.isRequired
};

export default SideNav;
