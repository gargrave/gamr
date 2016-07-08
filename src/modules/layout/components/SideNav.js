import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';


const SideNav = () => {
  return (
    <aside>
      <h2>Navigation</h2>
      <ul>
        <li><IndexLink to="/">Home</IndexLink></li>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </aside>
  );
};

SideNav.propTypes = {};

export default SideNav;
