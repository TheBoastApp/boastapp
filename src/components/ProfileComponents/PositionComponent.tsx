import { useState, useEffect, useRef } from 'react';

import { User, Position, Goal, Win } from '../../types';
import GoalComponent from './GoalComponent';
import PositionEditMenu from './PositionEditMenu';

import userService from '../../services/userService';

const NewGoalForm = ( props: {
  setShowNewGoalForm: any,
  currentNewGoal: string,
  setCurrentNewGoal: any,
  user: User,
  setUser: any,
  position: Position } ) => {

  const handleOnChange = ( event: any ) => {
    props.setCurrentNewGoal(event.target.value);
  }
  const handleCancel = ( event: any ) => {
    event.preventDefault();
    props.setShowNewGoalForm(false);
  }
  const handleSubmit = ( event: any ) => {
    event.preventDefault();

    // create new goals array
    const lastGoal = props.position.goals.at(-1)

    const newGoalObject : Goal = {
      id: lastGoal? lastGoal.id + 1 : 1,
      content: props.currentNewGoal,
      wins: []
    };

    const newGoals : Goal[] = props.position.goals.concat(newGoalObject);

    // replace positions array
    const changedPositionsIndex = props.user.positions.findIndex(
        position => position.id === props.position.id
    );

    props.user.positions[changedPositionsIndex].goals = newGoals;

    // call DB with a PUT request
    if (props.user.id) {
      userService
        .updateUser(props.user.id, props.user)
        .then(response => {
          props.setUser(response);
        });
    }
    props.setShowNewGoalForm(false);
    props.setCurrentNewGoal('add new goal...')
  }

  return (
    <form style={{ marginBottom: '10px' }}>
      <input
        style={{ minWidth: '550px' , marginRight: '5px' }}
        name='newGoalForm'
        id='newGoalForm'
        value={props.currentNewGoal}
        onChange={e => handleOnChange(e)}
        type='text' />
        <button style={{ marginRight: '5px' }} onClick={e => handleSubmit(e)}>Add</button>
        <button onClick={handleCancel}>Cancel</button>
    </form>
  );
}

const PositionComponent = ( props: { user: User, setUser: any, position: Position }) => {
  const [showEllipses, setShowEllipses] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(props.position.title);
  const [currentCompany, setCurrentCompany] = useState(props.position.company);
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [currentNewGoal, setCurrentNewGoal] = useState('add new goal...');

  const wrapperRef = useRef(null);

  const useOutsideClose = (ref: any) => {

    useEffect(() => {
      const handleClickOutside = ( event: any ) => {
        if (ref.current && !ref.current.contains(event.target)) {
          console.log('clicked here!');
          setShowMenu(false);
          setShowEllipses(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [ref]);
  };

  useOutsideClose(wrapperRef);

  const handleTitleChange = ( event: any ) => {
    setCurrentTitle(event.target.value);
  }

  const handleCompanyChange = ( event: any ) => {
    setCurrentCompany(event.target.value);
  }

  const handleSave = ( event: any ) => {
    event.preventDefault();

    // create new position object
    const newPositionObject = {
      ... props.position,
      title: currentTitle,
      company: currentCompany
    };

    // find and replace position
    const changedPositionIndex = props.user.positions
                                  .findIndex(
                                    position => position.id === props.position.id);

    props.user.positions[changedPositionIndex] = newPositionObject;

    // call DB with a PUT request
    if (props.user.id) {
      userService
        .updateUser(props.user.id, props.user)
        .then(response => {
          props.setUser(response);
        });
    }

    setShowEditForm(false);
    setShowMenu(false);

  }

  if (showEditForm) {
    return (
      <div style={{ width: '70%' }} >
      <form>
        <input
          style={{
            minWidth: '450px',
            marginBottom: '5px',
            marginTop: '5px',
            marginRight: '10px'}}
          type='text'
          name='updateTitle'
          id='updateTitle'
          value={currentTitle}
          onChange={handleTitleChange}/>
        <input
          style={{ minWidth: '150px', marginRight: '5px'}}
          type='text'
          name='updateCompany'
          id='updateCompany'
          value={currentCompany}
          onChange={handleCompanyChange}/>
          <button onClick={e => handleSave(e)}>Save</button>
      </form>
        {props.position.goals.map(
          goal => <GoalComponent
                    user={props.user}
                    setUser={props.setUser}
                    key={goal.id}
                    position={props.position}
                    goal={goal} />
        )}
      </div>
    );
  } else if (showEllipses) {
    return (
      <div style={{ width: '70%' , marginBottom: '25px' }}>
        <div
          ref={wrapperRef}
          onMouseOver={() => setShowEllipses(true)}
          onMouseOut={() => showMenu
            ? null
            : setShowEllipses(false)}>
          <h2 style={{ display: 'inline-block' }} >
            {props.position.title}, {props.position.company}
          </h2>
          <PositionEditMenu
            setShowNewGoalForm={setShowNewGoalForm}
            user={props.user}
            position={props.position}
            setUser={props.setUser}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            setShowEditForm={setShowEditForm}/>
        </div>
        {props.position.goals.map(
          goal => <GoalComponent
                    position={props.position}
                    user={props.user}
                    setUser={props.setUser}
                    key={goal.id}
                    goal={goal} />
        )}
        {showNewGoalForm && <NewGoalForm
          setShowNewGoalForm={setShowNewGoalForm}
          currentNewGoal={currentNewGoal}
          setCurrentNewGoal={setCurrentNewGoal}
          user={props.user}
          setUser={props.setUser}
          position={props.position}/>}
      </div>
    );
  }

  return (
    <div style={{ width: '70%' , marginBottom: '25px' }} >
      <h2 onMouseOver={() => setShowEllipses(true)}>
        {props.position.title}, {props.position.company}
      </h2>
      {props.position.goals.map(
        goal => <GoalComponent
                  user={props.user}
                  setUser={props.setUser}
                  key={goal.id}
                  position={props.position}
                  goal={goal} />
      )}
      {showNewGoalForm && <NewGoalForm
        setShowNewGoalForm={setShowNewGoalForm}
        currentNewGoal={currentNewGoal}
        setCurrentNewGoal={setCurrentNewGoal}
        user={props.user}
        setUser={props.setUser}
        position={props.position}/>}
    </div>
  );
};

export default PositionComponent;
