import { useState, useEffect, useRef } from 'react';

import { User, Position, Goal, Win } from '../../types';
import WinComponent from './WinComponent';
import GoalEditMenu from './GoalEditMenu';

import userService from '../../services/userService';

const NewWinForm = ( props: {
  user: User,
  setUser: any,
  position: Position,
  goal: Goal,
  currentNewWin: string,
  setCurrentNewWin: any,
  setShowNewWinForm: any
}) => {
  const handleOnChange = ( event: any ) => {
    props.setCurrentNewWin(event.target.value);
  }
  const handleCancel = ( event: any ) => {
    event.preventDefault();
    props.setShowNewWinForm(false);
  }
  const handleSubmit = ( event: any ) => {
    event.preventDefault();

    // create new wins array
    const lastWin = props.goal.wins.at(-1)

    const newWinObject : Win = {
      id: lastWin? lastWin.id + 1 : 1,
      content: props.currentNewWin
    };

    const newWins : Win[] = props.goal.wins.concat(newWinObject);

    // replace goals array
    const changedPositionIndex = props.user.positions.findIndex(
      position => position.id === props.position.id
    );

    const changedGoalIndex = props.position.goals.findIndex(
        goal => goal.id === props.goal.id
    );

    props.user.positions[changedPositionIndex].goals[changedGoalIndex].wins = newWins;

    // call DB with a PUT request
    if (props.user.id) {
      userService
        .updateUser(props.user.id, props.user)
        .then(response => {
          props.setUser(response);
        });
    }

    props.setShowNewWinForm(false);
    props.setCurrentNewWin('add new win...');
  }

  return (
    <form>
      <input
        style={{ minWidth: '550px' , marginRight: '5px' }}
        type='text'
        name='newWinForm'
        id='newWinForm'
        value={props.currentNewWin}
        onChange={e => handleOnChange(e)}
        />
      <button style={{ marginRight: '5px' }} onClick={e => handleSubmit(e)}>Add</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
}

const GoalComponent = ( props: {
  user: User,
  setUser: any,
  goal: Goal,
  position: Position }) => {
  const [showEllipses, setShowEllipses] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(props.goal.content);
  const [showNewWinForm, setShowNewWinForm] = useState(false);
  const [currentNewWin, setCurrentNewWin] = useState('add new win...');

  const wrapperRef = useRef(null);

  const useOutsideClose = (ref: any) => {

    useEffect(() => {
      const handleClickOutside = ( event: any ) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowMenu(false);
          setShowEllipses(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [ref]);
  }

  useOutsideClose(wrapperRef);

  const handleGoalChange = ( event: any ) => {
    setCurrentGoal(event.target.value);
  }

  const handleSave = ( event: any ) => {
    event.preventDefault();

    // create new goal object
    const newGoalObject = {
      ... props.goal,
      content: currentGoal
    };

    // find and replace goal
    const changedGoalIndex = props.position.goals
                                  .findIndex(
                                    goal => goal.id === props.goal.id);

    props.position.goals[changedGoalIndex] = newGoalObject;

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
      <div>
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
            value={currentGoal}
            onChange={e => handleGoalChange(e)}/>
            <button onClick={e => handleSave(e)}>Save</button>
        </form>
        {props.goal.wins.map(
          win => <WinComponent
                    user={props.user}
                    setUser={props.setUser}
                    position={props.position}
                    goal={props.goal}
                    key={win.id}
                    win={win} />
        )}
        {showNewWinForm && <NewWinForm
          goal = {props.goal}
          setShowNewWinForm={setShowNewWinForm}
          currentNewWin={currentNewWin}
          setCurrentNewWin={setCurrentNewWin}
          user={props.user}
          setUser={props.setUser}
          position={props.position}/>}
      </div>
    );
  } else if (showEllipses) {
    return (
      <div>
        <div
          ref={wrapperRef}
          onClick={() => setShowMenu(true)}
          onMouseOver={() => setShowEllipses(true)}
          onMouseOut={() => showMenu
            ? null
            : setShowEllipses(false)} >
          <h3 style={{ display: 'inline-block' }} >
            {props.goal.content}
          </h3>
          <GoalEditMenu
            goal={props.goal}
            setShowNewWinForm={setShowNewWinForm}
            user={props.user}
            position={props.position}
            setUser={props.setUser}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            setShowEditForm={setShowEditForm} />
        </div>
        {props.goal.wins.map(
          win => <WinComponent
          user={props.user}
          setUser={props.setUser}
          key={win.id}
          position={props.position}
          goal={props.goal}
          win={win} />
        )}
        {showNewWinForm && <NewWinForm
          goal = {props.goal}
          setShowNewWinForm={setShowNewWinForm}
          currentNewWin={currentNewWin}
          setCurrentNewWin={setCurrentNewWin}
          user={props.user}
          setUser={props.setUser}
          position={props.position}/>}
      </div>
    );
  }

  return (
    <div>
      <h3 onMouseOver={() => setShowEllipses(true)}> {props.goal.content}</h3>
      {props.goal.wins.map(
        win => <WinComponent
                  user={props.user}
                  setUser={props.setUser}
                  position={props.position}
                  goal={props.goal}
                  key={win.id}
                  win={win} />
      )}
      {showNewWinForm && <NewWinForm
        goal = {props.goal}
        setShowNewWinForm={setShowNewWinForm}
        currentNewWin={currentNewWin}
        setCurrentNewWin={setCurrentNewWin}
        user={props.user}
        setUser={props.setUser}
        position={props.position}/>}
    </div>
  );
};

export default GoalComponent;
