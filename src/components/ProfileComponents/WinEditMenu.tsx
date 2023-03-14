import { useState } from 'react';

const Menu = () => {

  const handleEdit = () => {
    console.log('edit this');
  }

  const handleDelete = () => {
    console.log('delete this');
  }

  return (
      <div className="contentMenuContent">
        <ul className="contentMenuLinks">
          <li><a href="#" onClick={handleEdit}>Edit</a></li>
          <li><a href="#" onClick={handleDelete}>Delete</a></li>
        </ul>
      </div>
  );
};

const WinEditMenu = (props: { showMenu: boolean, setShowMenu: any}) => {

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

export default WinEditMenu;
