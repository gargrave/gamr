import React, {PropTypes} from 'react';

import FirebaseContainer from './modules/firebase/FirebaseContainer';
import Navbar from './modules/layout/components/Navbar';
import SideNav from './modules/layout/components/SideNav';


const App = (props) => {
  return (
    <div>
      <FirebaseContainer />
      <Navbar />
      <div className="flex container">

        <div className="none fifth-1000">
          <SideNav />
        </div>

        <main className="full three-fifth-1000">
          {props.children}
        </main>

        <div className="fifth"></div>
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
