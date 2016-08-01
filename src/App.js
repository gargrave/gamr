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

        <div className="col-md-3">
          <div className="row">
            <SideNav />
          </div>
        </div>

        <main className="col-md-9">
          <div className="row">
            {props.children}
          </div>
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
