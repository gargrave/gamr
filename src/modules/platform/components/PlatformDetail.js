import React, {PropTypes} from 'react';
import {Link} from 'react-router';


const PlatformDetail = ({platform, altRow}) => {
  function getClass() {
    if (altRow) {
      return 'list-group-item list-group-alt-row';
    }
    return 'list-group-item';
  }

  return (
    <Link to={`/platform/${platform.id}`} className={getClass()}>
      <strong>{platform.name}</strong>
    </Link>
  );
};

PlatformDetail.propTypes = {
  platform: PropTypes.object.isRequired,
  altRow: PropTypes.bool,
};

export default PlatformDetail;
