import React, {PropTypes} from 'react';


const UserInfo = ({user, profile}) => {
  return (
    <div>
      <h3>{user.email}</h3>
      <hr/>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Name: </strong>
          {profile.name ? profile.name :
            <span className="text-muted">Not set </span>
          }
        </li>

        <li className="list-group-item">
          <strong>Email: </strong> {user.email}
        </li>

        <li className="list-group-item">
          <strong>Display name: </strong>
          {user.displayName || <span className="text-muted">Not set </span>}
        </li>

        <li className="list-group-item">
          <strong>Email verified: </strong> {user.emailVerified ? 'yes' : 'no'}
        </li>

        <li className="list-group-item">
          <strong>Photo URL: </strong> {user.photoURL || 'n/a'}
        </li>
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
