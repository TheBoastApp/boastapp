import { useState, useEffect, useRef } from 'react';

import { User, Position, Goal, Win } from '../../types';
import WinComponent from './WinComponent';
import GoalEditMenu from './GoalEditMenu';

const GoalComponent = ( props: { goal: Goal }) => {
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
  }

  useOutsideClose(wrapperRef);

  if (showEllipses) {
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
          <GoalEditMenu showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
        {props.goal.wins.map(
          win => <WinComponent key={win.id} win={win} />
        )}
      </div>
    );
  }

  return (
    <div>
      <h3 onMouseOver={() => setShowEllipses(true)}> {props.goal.content}</h3>
      {props.goal.wins.map(
        win => <WinComponent key={win.id} win={win} />
      )}
    </div>
  );
};

export default GoalComponent;
