import React, {PropTypes} from 'react';


const UserInfo = ({user, profile}) => {
  return (
    <div>
      <h1>{user.email}</h1>
      <hr/>
      <ul>
        <li>
          <strong>Name: </strong>
          {profile.name ? profile.name :
            <span className="text-muted">Not set </span>
          }
        </li>

        <li><strong>Email: </strong> {user.email}</li>

        <li>
          <strong>Display name: </strong>
          {user.displayName || <span className="text-muted">Not set </span>}
        </li>

        <li><strong>Email verified: </strong> {user.emailVerified ? 'yes' : 'no'}</li>

        <li><strong>Photo URL: </strong> {user.photoURL || 'n/a'}</li>
      </ul>
      <hr/>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default UserInfo;
