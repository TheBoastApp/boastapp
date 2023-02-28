import { useState } from 'react';
import { User } from '../../../types';

const ProfilePic = (props: { user: User | undefined, setShowLoginModal: any }) => {

  const handleOnClick = () => {
    if (props.user == undefined) {
      props.setShowLoginModal(true);
    } else {
      console.log('render profile menu');
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
