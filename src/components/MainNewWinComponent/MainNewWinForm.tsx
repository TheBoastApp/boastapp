import React from 'react';

import { useState, useEffect } from 'react';
import { User, Position, Goal, Win } from '../../types';

import positionsService from '../../services/positionsService';
import userService from '../../services/userService';

const ID = 'id';
const TITLE = 'title';
const COMPANY = 'company';
const GOALS = 'goals';
const CONTENT = 'content';
const WINS = 'wins';

const MainNewWinForm = ( props: { user: User, setUser: any } ) => {
  const [win, setWin] = useState<string>('enter your win...');
  const [positionID, setPositionID] = useState<number>(0);
  const [goalID, setGoalID] = useState<number>(0);
  const [userPositions, setUserPositions] = useState<Position[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  // get all of user's positions
  useEffect(() => {
    if (props.user.email !== '') {
      console.log(props.user.email)
      positionsService
        .getAllPositions(props.user.email)
        .then(returnedPositions => setUserPositions(returnedPositions));
    }
  }, [props.user]);

  // on change handlers to capture info entered into form fields
  const handleWinOnChange = ( event: any ) => {
    setWin(event.target.value);
  }

  const handleGoalOnChange = ( event: any ) => {
    setGoalID(parseInt(event.target.value));
  }

  const handlePositionOnChange = ( event: any ) => {
    const posID: number = parseInt(event.target.value);
    setPositionID(posID);

    // find position where position id matches
    // populate goals dropdown
    const position : Position | undefined =
      userPositions.find( position => position[ID] === posID);

    if (position !== undefined) {
      setGoals(position[GOALS]);
    }

  }

  /*
    This super gnarly function handles creating a new win.
    Currently, this is inefficient, but the hope is to optimize this once we move
    to MongoDB
  */
  const handleNewWinSubmit = ( event: any ) => {
    event.preventDefault();

    // grab the goal and position objects
    const currentPosition : Position | undefined =
      userPositions.find( position => position[ID] === positionID );

    const currentGoal : Goal | undefined =
      goals.find( goal => goal[ID] === goalID );

    if (currentPosition !== undefined && currentGoal !== undefined) {

      // create new win object
      const newWinObject : Win = {
        id: currentGoal[WINS].length + 1,
        content: win
      }

      console.log(
        `Adding new win to position: ${currentPosition.title}
        and goal: ${currentGoal.title} - `);

      console.log(newWinObject);

      // concat new win object to wins array
      const newWins : Win[] = currentGoal[WINS].concat(newWinObject);

      // create new goal object that contains everything, but change wins
      const changedGoal : Goal = {
        ... currentGoal,
        wins: newWins
      };

      // concat new goals object to goals array
      const newGoals : Goal[] = currentPosition[GOALS]
                        .filter( goal => goal.id !== goalID )
                        .concat(changedGoal);

      // create new positions object that contains everything, but change goals
      const changedPosition : Position = {
        ... currentPosition,
        goals: newGoals
      };

      // concat new position object to positions array
      const newPositions : Position[] =
        userPositions
          .filter( position => position.id !== positionID )
          .concat(changedPosition);

      // create a new user object with new positions
      const newUserObject : User = {
        ... props.user,
        positions: newPositions
      };

      // call DB with a PUT request
      if (props.user.id) {
        userService
          .updateUser(props.user.id, newUserObject)
          .then(response => {
            props.setUser(response);
          });
      }
    }

    setWin('');
  }

  return (
    <div style={{ marginLeft: '100px' }}>
      <form onSubmit={handleNewWinSubmit}>
        <input
          value={win}
          onChange={handleWinOnChange}
          style={{ width: '1000px', marginBottom: '20px'}}
          /><br />
        <label>Position: </label>
        <select
          style={{ marginLeft: '10px', marginRight: '20px' }}
          onChange={handlePositionOnChange}
          required>
          <option value=''>Select a Position</option>
          { positionID ? <option value=''>Create New &gt; &gt;</option> : null }
          {userPositions.map(
              position =>
              <option key={position[ID]} value={position[ID]}>
              {position[TITLE]}, {position[COMPANY]}
              </option>)}
        </select>
        <label>Goal: </label>
        <select
          style={{ marginLeft: '10px', marginRight: '20px' }}
          onChange={handleGoalOnChange}
          required>
          <option value=''>Select a Goal</option>
          { positionID ? <option value=''>Create New &gt; &gt;</option> : null }
          { goals.map(
              goal =>
              <option key={goal[ID]} value={goal[ID]}>
              {goal[CONTENT]}
              </option>)}
        </select>
        <button type='submit'>Add Win</button>
      </form>
    </div>
  );
}

export default MainNewWinForm;
