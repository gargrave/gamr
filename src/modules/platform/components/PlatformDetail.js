import React, {PropTypes} from 'react';
import {Link} from 'react-router';


const PlatformDetail = ({platform}) => {
  return (
    <article className="card">
      <header>
        <h3><Link to={`/platform/${platform.id}`}>{platform.name}</Link></h3>
      </header>
      <p>
        created: {platform.created}&nbsp;|
        updated: {platform.modified}
      </p>
    </article>
  );
};

PlatformDetail.propTypes = {
  platform: PropTypes.object.isRequired
};

export default PlatformDetail;
