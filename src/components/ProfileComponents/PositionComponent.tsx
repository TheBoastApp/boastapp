import { useState, useEffect, useRef } from 'react';

import { User, Position, Goal, Win } from '../../types';
import GoalComponent from './GoalComponent';
import PositionEditMenu from './PositionEditMenu';

const PositionComponent = ( props: { position: Position }) => {
  const [showEllipses, setShowEllipses] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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

  if (showEllipses) {
    return (
      <div style={{ width: '70%' }}>
        <div
          ref={wrapperRef}
          onClick={() => setShowMenu(true)}
          onMouseOver={() => setShowEllipses(true)}
          onMouseOut={() => showMenu
            ? null
            : setShowEllipses(false)}>
          <h2 style={{ display: 'inline-block' }} >
            {props.position.title}, {props.position.company}
          </h2>
          <PositionEditMenu showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
        {props.position.goals.map(
          goal => <GoalComponent key={goal.id} goal={goal} />
        )}
      </div>
    );
  }

  return (
    <div style={{ width: '70%' }} >
      <h2 onMouseOver={() => setShowEllipses(true)}>
        {props.position.title}, {props.position.company}
      </h2>
      {props.position.goals.map(
        goal => <GoalComponent key={goal.id} goal={goal} />
      )}
    </div>
  );
};

export default PositionComponent;
