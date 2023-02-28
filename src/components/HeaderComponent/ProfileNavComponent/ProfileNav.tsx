import { useState } from 'react';

import ProfilePic from './ProfilePic';
import ProfileMenu from './ProfileMenu';
import { User } from '../../../types';

const ProfileNav = (props: { user: User, setShowLoginModal: any }) => {
  return (
    <div>
    <ProfilePic user={props.user} setShowLoginModal={props.setShowLoginModal} />
    <ProfileMenu />
    </div>
  );
};

export default ProfileNav;
