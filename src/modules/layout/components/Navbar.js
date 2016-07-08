import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import {APP_TITLE} from '../../../constants/appConfig';


const Navbar = () => {
  return (
    <nav className="demo">
      <Link to="/" className="brand">
        <span>{APP_TITLE}</span>
      </Link>

      <input id="bmenub" type="checkbox" className="show"/>
      <label htmlFor="bmenub" className="burger pseudo button">menu</label>

      <div className="menu">
        <Link to="/account" className="button pseudo">Account</Link>
      </div>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
