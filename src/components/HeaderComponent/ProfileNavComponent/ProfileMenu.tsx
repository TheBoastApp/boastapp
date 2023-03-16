import { useState } from 'react';
import { Link } from 'react-router-dom';

import { User } from '../../../types';

const Menu = (props: { setShowProfileModal: any, setUser: any }) => {
  const handleLinkClick = () => {
    props.setShowProfileModal(false);
  }
  const handleMenuClose = () => {
    props.setShowProfileModal(false);
  }
  const handleSignOut = () => {
    props.setShowProfileModal(false);
    props.setUser(undefined);
  }
  return (
    <div className="profileMenu" onClick={handleMenuClose}>
      <div className="profileMenuContent" onClick={e => e.stopPropagation()}>
        <ul className="profileMenuLinks">
          <li onClick={handleLinkClick}><Link to={`/`}>Home</Link></li>
          <li onClick={handleLinkClick}><Link to={`profile`}>Profile</Link></li>
          <li onClick={handleSignOut}><Link to={`/`}>Sign Out</Link></li>
        </ul>
      </div>
    </div>
  );
};


const ProfileMenu = (props: {
  setUser: any,
  showProfileModal: boolean,
  setShowProfileModal: any
 }) => {
  if (props.showProfileModal) {
    return (
      <Menu setShowProfileModal={props.setShowProfileModal} setUser={props.setUser}/>
    );
  } else {
    return null;
  }

};

export default ProfileMenu;
