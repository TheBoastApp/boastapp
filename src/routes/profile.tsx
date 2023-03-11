import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useUser } from '../App';
import { User, Position, Goal, Win } from '../types';

const ID = 'id';
const TITLE = 'title';
const COMPANY = 'company';
const GOALS = 'goals';
const CONTENT = 'content';
const WINS = 'wins';
const POSITIONS = 'positions';

// map user goals
const mapPositionToGoals = ( position: Position ) => {
  const goals: Goal[] = position[GOALS];

  return (
    <div key={'position ' + position[ID]}>
      <h2 key={position[ID]}>{position[TITLE]}, {position[COMPANY]}</h2>
        {goals.map(
          goal => mapGoalToWins(goal)
        )}
    </div>
  );
}

const mapGoalToWins = ( goal: Goal ) => {
  const wins: Win[] = goal[WINS];
  return (
    <div key={'goal ' + goal[ID]}>
      <h3 key={goal[ID]}>{goal.content}</h3>
      {wins.map(
        win => <p key={win[ID]}>{win.content}</p>
      )}
    </div>
  );
}

const UserProfile = () => {
  const { user } = useUser();
  const [userPositions, setUserPositions] = useState<Position[]>([]);

  useEffect(
    () => {
      if (user) {
        console.log(user);
        setUserPositions(user[POSITIONS]);
      }
    }, [user]
  );

  if (user) {
    return (
      <div style={{ display: 'flex', marginTop: '30px' }}>
        <div className="leftProfileColumn">
          <img
            src={ user.profilePic !== "" ? user.profilePic : 'defaultProfilePic.png'}
            style={{ borderRadius: '50%', maxWidth: 300 }} 
          />
          <h1>{user.firstName} {user.lastName}</h1>
          <p>Placeholder for some content...</p>
        </div>
        <div className="rightProfileColumn">
          {userPositions.map(
            position => mapPositionToGoals(position)
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
