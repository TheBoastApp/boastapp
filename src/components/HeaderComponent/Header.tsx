import { useState } from 'react';

import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { User } from '../../types';

const ProfilePic = (props: { user: User, setShowLoginModal: any }) => {
  return (
    <img
      className='avatar'
      src='defaultProfilePic.png'
      onClick={() => props.setShowLoginModal(true)}
    />
  );
}

const Header = (props: { user: User, setUser: any }) => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);

  return (
    <div>
    <h1 className='appTitle'>BOAST</h1>
    <ProfilePic user={props.user} setShowLoginModal={setShowLoginModal} />
    <LoginModal
      showLoginModal={showLoginModal}
      setShowLoginModal={setShowLoginModal}
      setShowSignUpModal={setShowSignUpModal}
      user={props.user}
      setUser={props.setUser}
    />
    <SignUpModal
      showSignUpModal={showSignUpModal}
      setShowSignUpModal={setShowSignUpModal}
      setUser={props.setUser}
    />
    </div>
  );
}

export default Header;
