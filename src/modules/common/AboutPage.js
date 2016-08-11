import React from 'react';

import {APP_TITLE} from '../../constants/appConfig';


const AboutPage = () => {
  return (
    <div>
      <h3>About {APP_TITLE}</h3>
      <hr/>

      <p>
        <strong>Gamr</strong> is a simple app to keep track of what games I am playing, and when.
      </p>

      <p>
        It uses React with Redux on the front-end, and Firebase on the back-end for authentication and DB (along with a handful of other smaller JS and CSS libraries).
      </p>

      <p>
        For more info on myself or any of the technologies, check the links below:
      </p>
      <br/>

      <div className="list-group">
        <a className="list-group-item" href="https://github.com/gargrave" target="_blank">
          My GitHub Profile
        </a>
        <a className="list-group-item" href="https://github.com/coryhouse/react-slingshot" target="_blank">
          React Slingshot (React Project Boilerplate)
        </a>
        <a className="list-group-item" href="https://firebase.google.com/" target="_blank">
          Firebase
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
