import { useState, useEffect } from 'react';

import userService from '../../services/userService';
import { User, Position, Goal, Win } from '../../types';

const Menu = (props: {
  win: Win,
  goal: Goal,
  position: Position,
  user: User,
  setUser: any,
  setShowMenu: any,
  setShowEditForm: any } ) => {
  console.log('props:', props);

  const handleEdit = () => {
    console.log('edit this');
    props.setShowEditForm(true);
    props.setShowMenu(false);
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      props.setShowMenu(false);

      // create new wins array without win
      const newWins : Win[] = props.goal.wins.filter( win => win.id !== props.win.id);

      // grab goal and position index
      const changedGoalIndex =
        props.position.goals.findIndex( goal => goal.id === props.goal.id );

      const changedPositionIndex =
        props.user.positions.findIndex( position => position.id === props.position.id);

      // replace wins array
      props.user.positions[changedPositionIndex].goals[changedGoalIndex].wins = newWins;


      // call DB with a PUT request
      if (props.user.id) {
        userService
          .updateUser(props.user.id, props.user)
          .then(response => {
            console.log('new user:', response);
            props.setUser(response);
          });
      }

    }

  }

  return (
      <div className="contentMenuContent" >
        <ul className="contentMenuLinks">
          <li onClick={handleEdit}>Edit</li>
          <li onClick={handleDelete}>Delete</li>
        </ul>
      </div>
  );
};

const WinEditMenu = (props: {
  user: User,
  setUser: any,
  win: Win,
  goal: Goal,
  position: Position,
  showMenu: boolean,
  setShowMenu: any,
  setShowEditForm: any } ) => {

  console.log('rendering user:', props.user);

  return (
    <div style={{ display: 'inline-block', float: 'right', position: 'relative' }}>
        <div
          onClick={() => props.setShowMenu(true)}
          style={{ textAlign: 'center' }}>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        { props.showMenu && <Menu
                              win={props.win}
                              position={props.position}
                              goal={props.goal}
                              user={props.user}
                              setUser={props.setUser}
                              setShowMenu={props.setShowMenu}
                              setShowEditForm={props.setShowEditForm} /> }
      </div>
  );
};

export default WinEditMenu;
