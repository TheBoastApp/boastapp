import { useState } from 'react';

import { User, Position, Goal, Win } from '../../types';
import GoalComponent from './GoalComponent';

const PositionComponent = ( props: { position: Position }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div style={{ width: '70%' }}>
      <h2 onMouseOver={() => console.log('position hovered:', props.position.id)}>
        {props.position.title}, {props.position.company}
      </h2>
      {props.position.goals.map(
        goal => <GoalComponent key={goal.id} goal={goal} />
      )}
    </div>
  );
};

export default PositionComponent;
