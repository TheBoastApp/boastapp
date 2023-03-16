import { useState, useEffect, useRef } from 'react';

import { User, Position, Goal, Win } from '../../types';
import userService from '../../services/userService';

import WinEditMenu from './WinEditMenu';

const WinComponent = ( props: {
  user: User,
  setUser: any,
  win: Win,
  goal: Goal,
  position: Position }) => {

  const [showEllipses, setShowEllipses] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentWin, setCurrentWin] = useState(props.win.content);

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

  const handleWinOnChange = ( event: any ) => {
    setCurrentWin(event.target.value);
  }

  const handleSave = ( event: any ) => {
    event.preventDefault();

    // find and replace win
    const changedWinIndex = props.goal.wins.findIndex( win => win.id === props.win.id )

    // grab goal and position index
    const changedGoalIndex =
      props.position.goals.findIndex( goal => goal.id === props.goal.id );

    const changedPositionIndex =
      props.user.positions.findIndex( position => position.id === props.position.id);

    // replace wins array
    props.user
      .positions[changedPositionIndex]
      .goals[changedGoalIndex]
      .wins[changedWinIndex].content = currentWin;


    // call DB with a PUT request
    if (props.user.id) {
      userService
        .updateUser(props.user.id, props.user)
        .then(response => {
          props.setUser(response);
        });
    }

    setShowEditForm(false);

  }

  if (showEditForm) {
    return (
      <div>
        <form>
          <input
            type='text'
            style={{ marginBottom: '5px', marginTop: '5px', marginRight: '10px', minWidth: '550px'}}
            name='updatedWin'
            id='updatedWin'
            value={currentWin}
            onChange={handleWinOnChange}/>
          <button onClick={ e => handleSave(e)}>Save</button>
        </form>
      </div>
    );
  } else if (showEllipses) {
    return (
      <div
        ref={wrapperRef}
        onMouseOver={() => setShowEllipses(true)}
        onMouseOut={() => showMenu
          ? null
          : setShowEllipses(false)} >
        <p style={{ display: 'inline-block' }}>
        {props.win.content}
        </p>
        <WinEditMenu
          user={props.user}
          setUser={props.setUser}
          win={props.win}
          position={props.position}
          goal={props.goal}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setShowEditForm={setShowEditForm}/>
      </div>
    );
  } else {
    return (
      <div>
        <div onMouseOver={() => setShowEllipses(true)}>
          <p>
          {props.win.content}
          </p>
        </div>
      </div>
    );
  }
};

export default WinComponent;
