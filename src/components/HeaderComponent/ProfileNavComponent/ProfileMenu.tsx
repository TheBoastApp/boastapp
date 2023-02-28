import { useState } from 'react';
import { User } from '../../../types';

const Menu = (props: { setShowProfileModal: any }) => {
  const handleMenuClose = () => {
    props.setShowProfileModal(false);
  }
  return (
    <div className="profileMenu" onClick={handleMenuClose}>
      <div className="profileMenuContent" onClick={e => e.stopPropagation()}>
        <ul className="profileMenuLinks">
          <li><a href="#home">Home</a></li>
          <li><a href="#profile">Profile</a></li>
          <li><a href="#login">Log In</a></li>
          <li><a href="#signout">Sign Out</a></li>
        </ul>
      </div>
    </div>
  );
};


const ProfileMenu = (props: {
  showProfileModal: boolean,
  setShowProfileModal: any
 }) => {
  if (props.showProfileModal) {
    return (
      <Menu setShowProfileModal={props.setShowProfileModal}/>
    );
  } else {
    return null;
  }

};

export default ProfileMenu;
