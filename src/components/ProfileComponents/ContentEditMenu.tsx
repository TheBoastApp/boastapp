import { useState } from 'react';

const Menu = () => {

  return (
      <div className="contentMenuContent">
        <ul className="contentMenuLinks">
          <li><a href="#">Edit</a></li>
          <li ><a href="#">Delete</a></li>
        </ul>
      </div>
  );
};

const ContentEditMenu = (props: { showMenu: boolean, setShowMenu: any}) => {

  return (
    <div style={{ display: 'inline-block', float: 'right', position: 'relative' }}>
        <div
          style={{ textAlign: 'center' }}>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        { props.showMenu && <Menu /> }
      </div>
  );
};

export default ContentEditMenu;
