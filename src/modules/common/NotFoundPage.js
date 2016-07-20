import React from 'react';
import {Link} from 'react-router';


const NotFoundPage = () => {
  return (
    <div>
      <h2>
        404 Page Not Found
      </h2>
      <Link to="/"> Go back to homepage </Link>
    </div>
  );
};

export default NotFoundPage;
