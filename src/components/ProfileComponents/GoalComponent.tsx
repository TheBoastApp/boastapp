import { useState } from 'react';

import { User, Position, Goal, Win } from '../../types';
import WinComponent from './WinComponent';

const GoalComponent = ( props: { goal: Goal }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <h3 onMouseOver={() => console.log('goal hovered:', props.goal.id)}>
        {props.goal.content}
      </h3>
      {props.goal.wins.map(
        win => <WinComponent key={win.id} win={win} />
      )}
    </div>
  );
};

export default GoalComponent;
