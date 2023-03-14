import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useUser } from '../App';
import { User, Position, Goal, Win } from '../types';

import PositionComponent from '../components/ProfileComponents/PositionComponent'

const ColumnProfilePicture = ( props: { user: User } ) => {
  return <img
    src={ props.user.profilePic !== "" ? props.user.profilePic : 'defaultProfilePic.png'}
    style={{ borderRadius: '50%', maxWidth: 300 }}
  />
}

const UserProfile = () => {
  const { user } = useUser();
  const [userPositions, setUserPositions] = useState<Position[]>([]);

  useEffect(
    () => {
      if (user) {
        setUserPositions(user.positions);
      }
    }, [user]
  );

  if (user) {
    return (
      <div style={{ display: 'flex', marginTop: '30px' }}>
        <div className="leftProfileColumn">
          <ColumnProfilePicture user={user} />
          <h1>{user.firstName} {user.lastName}</h1>
          <p>Placeholder for some content...</p>
        </div>
        <div className="rightProfileColumn">
          {userPositions.map(
            position => <PositionComponent key={position.id} position={position}/>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
      <p style={{ marginLeft: '30px' }}>Sign in to continue.</p>
      </div>
    )
  }

}

export default UserProfile;
