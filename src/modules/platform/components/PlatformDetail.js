import React, {PropTypes} from 'react';
import {Link} from 'react-router';


const PlatformDetail = ({platform}) => {
  return (
    <Link to={`/platform/${platform.id}`} className="list-group-item">
      <strong>{platform.name}</strong>
    </Link>
  );
};

PlatformDetail.propTypes = {
  platform: PropTypes.object.isRequired
};

export default PlatformDetail;
