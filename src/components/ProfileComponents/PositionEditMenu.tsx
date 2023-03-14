import { useState } from 'react';

import userService from '../../services/userService';
import { User, Position, Goal, Win } from '../../types';

const Menu = ( props: {
  user: User,
  position: Position,
  setShowNewGoalForm: any,
  setShowMenu: any,
  setShowEditForm: any,
  setUser: any }) => {

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      props.setShowMenu(false);

      // create new positions array without position
      const newPositions : Position[] = props.user.positions.filter(
        position => position.id !== props.position.id);

      // replace positions array
      props.user.positions = newPositions;

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

  const handleAddGoal = () => {
    props.setShowMenu(false);
    props.setShowNewGoalForm(true);
  }

  return (
      <div className="contentMenuContent">
        <ul className="contentMenuLinks">
          <li onClick={() => props.setShowEditForm(true)}>Edit</li>
          <li onClick={handleDelete}>Delete</li>
          <li onClick={handleAddGoal}>Add Goal</li>
        </ul>
      </div>
  );
};

const PositionEditMenu = (props: {
  user: User,
  setUser: any,
  showMenu: boolean,
  position: Position,
  setShowNewGoalForm: any,
  setShowMenu: any,
  setShowEditForm: any }) => {

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
                              user={props.user}
                              position={props.position}
                              setShowMenu={props.setShowMenu}
                              setShowNewGoalForm={props.setShowNewGoalForm}
                              setShowEditForm={props.setShowEditForm}
                              setUser={props.setUser}/> }
      </div>
  );
};

export default PositionEditMenu;
