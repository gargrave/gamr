import React, {PropTypes} from 'react';

import PlatformDetail from './PlatformDetail';


const PlatformList = ({platforms}) => {
  let count = platforms.length;
  return (
    <div>
      {/* message shown when user has no platforms */}
      {!count &&
        <h4>You have not added any platforms yet.</h4>
      }

      {/* list shown when user has 1 or more platforms */}
      {!!count && platforms.map(platform =>
        <PlatformDetail key={platform.id} platform={platform}/>
      )}
    </div>
  );
};

PlatformList.propTypes = {
  platforms: PropTypes.array.isRequired
};

export default PlatformList;
