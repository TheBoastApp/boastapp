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

  if (props.user) {
    return (
      <img
        className='avatar'
        src={ props.user.profilePic !== ""
          ? props.user.profilePic
          : 'defaultProfilePic.png' }
        onClick={handleOnClick}
      />
    );
  } else {
    return (
      <img
        className='avatar'
        src='defaultProfilePic.png'
        onClick={handleOnClick}
      />
    );
  }
};

export default ProfilePic;
