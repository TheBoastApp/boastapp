import { useState } from 'react';

import ProfilePic from './ProfilePic';
import ProfileMenu from './ProfileMenu';
import { User } from '../../../types';

const ProfileNav = (props: {
  user: User | undefined,
  setShowLoginModal: any,
  showProfileModal: boolean,
  setShowProfileModal: any
 }) => {
  return (
    <div>
    <ProfilePic
      user={props.user}
      setShowLoginModal={props.setShowLoginModal}
      setShowProfileModal={props.setShowProfileModal}
      />
    <ProfileMenu
      showProfileModal={props.showProfileModal}
      setShowProfileModal={props.setShowProfileModal}
      />
    </div>
  );
};

export default ProfileNav;
