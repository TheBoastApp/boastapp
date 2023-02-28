import { useState } from 'react';
import { User } from '../../../types';

const ProfilePic = (props: { user: User | undefined, setShowLoginModal: any }) => {

  const handleOnClick = () => {
    props.setShowLoginModal(true);
  };

  return (
    <img
      className='avatar'
      src='defaultProfilePic.png'
      onClick={handleOnClick}
    />
  );
};

export default ProfilePic;
