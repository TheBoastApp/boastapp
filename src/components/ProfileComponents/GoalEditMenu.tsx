import { useState } from 'react';

import userService from '../../services/userService';
import { User, Position, Goal, Win } from '../../types';

const Menu = (props: {
  goal: Goal,
  user: User,
  position: Position,
  setShowNewWinForm: any,
  setShowMenu: any,
  setShowEditForm: any,
  setUser: any }) => {

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      props.setShowMenu(false);

      // create new goals array without current goal
      const newGoals : Goal[] = props.position.goals.filter(
        goal => goal.id !== props.goal.id);

      // replace goals array
      props.position.goals = newGoals;

      // call DB with PUT request
      if (props.user.id) {
        userService
          .updateUser(props.user.id, props.user)
          .then(response => {
            props.setUser(response);
          });
      }

    }
  }

  const handleAddWin = ( ) => {
    props.setShowMenu(false);
    props.setShowNewWinForm(true);
  }

  return (
      <div className="contentMenuContent">
        <ul className="contentMenuLinks">
          <li onClick={() => props.setShowEditForm(true)}>Edit</li>
          <li onClick={handleDelete}>Delete</li>
          <li onClick={handleAddWin}>Add Win</li>
        </ul>
      </div>
  );
};

const GoalEditMenu = (props: {
  goal: Goal,
  user: User,
  setUser: any,
  showMenu: boolean,
  position: Position,
  setShowNewWinForm: any,
  setShowMenu: any,
  setShowEditForm: any }) => {

  return (
    <div style={{ display: 'inline-block', float: 'right', position: 'relative' }}>
        <div
          style={{ textAlign: 'center' }}>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        { props.showMenu && <Menu
                              goal={props.goal}
                              user={props.user}
                              position={props.position}
                              setShowMenu={props.setShowMenu}
                              setShowNewWinForm={props.setShowNewWinForm}
                              setShowEditForm={props.setShowEditForm}
                              setUser={props.setUser}
                              /> }
      </div>
  );
};

export default GoalEditMenu;
