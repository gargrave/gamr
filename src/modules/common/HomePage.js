import React from 'react';
import {Link, IndexLink} from 'react-router';

import {APP_TITLE} from '../../constants/appConfig';
import SideNav from '../layout/components/SideNav';


const HomePage = () => {
  return (
    <div>
      <h3>{APP_TITLE}</h3>
      <hr/>

      <div className="list-group">
        <Link to="/game" className="list-group-item">Games</Link>
        <Link to="/platform" className="list-group-item">Platforms</Link>
        <Link to="/account" className="list-group-item">Account</Link>
        <Link to="/about" className="list-group-item">About</Link>
      </div>

    </div>
  );
};

export default HomePage;
