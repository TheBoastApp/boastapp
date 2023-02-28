import { useState } from 'react';
import { User } from '../../../types';

const ProfilePic = (props: { user: User, setShowLoginModal: any }) => {
  return (
    <img
      className='avatar'
      src='defaultProfilePic.png'
      onClick={() => props.setShowLoginModal(true)}
    />
  );
};

export default ProfilePic;
