import { useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useUser } from '../App';
import { User, Position, Goal, Win } from '../types';

import userService from '../services/userService';
import PositionComponent from '../components/ProfileComponents/PositionComponent'

const ColumnProfilePicture = ( props: { user: User } ) => {
  return <img
    src={ props.user.profilePic !== "" ? props.user.profilePic : 'defaultProfilePic.png'}
    style={{ borderRadius: '50%', maxWidth: 300 }}
  />
}

const NewPositionForm = ( props: {
  user: User,
  setUser: any,
  currentTitle: string,
  setCurrentTitle: any,
  currentCompany: string,
  setCurrentCompany: any,
  setShowNewPositionForm: any
}) => {
  const handleCancel = ( event: any ) => {
    event.preventDefault();
    props.setShowNewPositionForm(false);
    props.setCurrentTitle('add new title...');
    props.setCurrentCompany('add new company...');
  }

  const handleSubmit = ( event: any ) => {
    event.preventDefault();

    // create new positions array
    const lastPosition = props.user.positions.at(-1);

    const newPositionObject: Position = {
      id: lastPosition ? lastPosition.id + 1 : 1,
      title: props.currentTitle,
      company: props.currentCompany,
      goals: []
    }

    const newPositions: Position[] = props.user.positions.concat(newPositionObject);
    props.user.positions = newPositions;

    // replace user
    if (props.user.id) {
      userService
        .updateUser(props.user.id, props.user)
        .then(response => {
          props.setUser(response);
        });
    }

    props.setShowNewPositionForm(false);
    props.setCurrentTitle('add new title...');
    props.setCurrentCompany('add new company...');
  }

  const handleTitleOnChange = (event: any) => {
    props.setCurrentTitle(event.target.value);
  }

  const handleCompanyOnChange = ( event: any ) => {
    props.setCurrentCompany(event.target.value);
  }

  return (
    <form>
      <input
        style={{ minWidth: '300px', marginBottom: '5px' }}
        name='newTitleInput'
        id='newTitleInput'
        value={props.currentTitle}
        onChange={handleTitleOnChange}
        type='text' /><br />
      <input
        style={{ minWidth: '300px', marginBottom: '5px' }}
        name='newTitleInput'
        id='newTitleInput'
        value={props.currentCompany}
        onChange={handleCompanyOnChange}
        type='text' /><br />
      <button onClick={handleSubmit} style={{ marginRight: '5px' }}>Add</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
}

const UserProfile = () => {
  const { user, setUser } = useUser();
  const [userPositions, setUserPositions] = useState<Position[]>([]);
  const [showNewPositionForm, setShowNewPositionForm] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('add your title...');
  const [currentCompany, setCurrentCompany] = useState('add your company...');

  useEffect(
    () => {
      if (user) {
        console.log('profile.tsx rendering positions');
        console.log('user:', user);
        console.log('user positions:', user.positions);
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
          {showNewPositionForm ?
            <NewPositionForm
              user={user}
              setUser={setUser}
              setShowNewPositionForm={setShowNewPositionForm}
              currentTitle={currentTitle}
              setCurrentTitle={setCurrentTitle}
              currentCompany={currentCompany}
              setCurrentCompany={setCurrentCompany}/> :
            <button onClick={() => setShowNewPositionForm(true)}>Add New Position</button>}
        </div>
        <div className="rightProfileColumn">
          {userPositions.map(
            position => <PositionComponent user={user} setUser={setUser} key={position.id} position={position}/>
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
