import { useState, useEffect, useRef } from 'react';

import { User, Position, Goal, Win } from '../../types';
import ContentEditMenu from './ContentEditMenu';
// TODO: Allow users to edit wins
// Show ellipses on hover
// When clicked, show menu

const useOutsideAlerter = (ref: any) => {
  useEffect(() => {
    const handleClickOutside = ( event: any ) => {
      if (ref.current && !ref.current.contains(event.target)) {
        alert("You clicked outside of me!");
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [ref]);
}

const WinComponent = ( props: { win: Win }) => {
  const [showEllipses, setShowEllipses] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const wrapperRef = useRef(null);

  const useOutsideAlerter = (ref: any) => {
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

  useOutsideAlerter(wrapperRef);

  if (showEllipses) {
    return (
      <div
        ref={wrapperRef}
        onClick={() => setShowMenu(true)}
        onMouseOver={() => setShowEllipses(true)}
        onMouseOut={() => showMenu
          ? null
          : setShowEllipses(false)} >
        <p style={{ display: 'inline-block' }}>
        {props.win.content}
        </p>
        <ContentEditMenu showMenu={showMenu} setShowMenu={setShowMenu}/>
      </div>
    );
  }

  return (
    <div>
      <div onMouseOver={() => setShowEllipses(true)}>
        <p>
        {props.win.content}
        </p>
      </div>
    </div>
  );
};

export default WinComponent;
