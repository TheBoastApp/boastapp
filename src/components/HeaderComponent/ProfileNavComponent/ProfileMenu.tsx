import { useState } from 'react';
import { User } from '../../../types';

const Menu = () => {
  return (
    <div className="profileMenu">
      <div className="profileMenuContent">
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
      <Menu />
    );
  } else {
    return null;
  }

};

export default ProfileMenu;
