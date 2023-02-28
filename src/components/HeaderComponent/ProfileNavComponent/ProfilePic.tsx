import { useState } from 'react';
import { User } from '../../../types';

const ProfilePic = (props: {
  user: User | undefined,
  setShowLoginModal: any,
  setShowProfileModal: any
}) => {

  const handleOnClick = () => {
    if (props.user == undefined) {
      props.setShowLoginModal(true);
    } else {
      props.setShowProfileModal(true);
    }
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
