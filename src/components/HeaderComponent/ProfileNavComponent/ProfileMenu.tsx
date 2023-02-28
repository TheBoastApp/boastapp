import { useState } from 'react';
import { User } from '../../../types';

const Menu = () => {
  return (
    <div className="profileMenu">
      <ul className='profileMenuLinks'>
      <li><a href="#home">Home</a></li>
      <li><a href="#profile">Profile</a></li>
      <li><a href="#login">Log In</a></li>
      <li><a href="#signout">Sign Out</a></li>
      </ul>
    </div>
  );
}


const ProfileMenu = () => {

  return (
    <div>
    <Menu />
    </div>
  );
};

export default ProfileMenu;
