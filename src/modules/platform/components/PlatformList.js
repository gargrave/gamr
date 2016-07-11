import React, {PropTypes} from 'react';

import PlatformDetail from './PlatformDetail';


const PlatformList = ({platforms}) => {
  return (
    <div>
      {platforms.map(platform =>
        <PlatformDetail key={platform.id} platform={platform}/>
      )}
    </div>
  );
};

PlatformList.propTypes = {
  platforms: PropTypes.array.isRequired
};

export default PlatformList;
