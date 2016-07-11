import React, {PropTypes} from 'react';


const PlatformDetail = ({platform}) => {
  return (
    <article className="card">
      <header>
        <h3>{platform.name}</h3>
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
