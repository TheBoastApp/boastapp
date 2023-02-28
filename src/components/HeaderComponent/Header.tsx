import { useState } from 'react';

import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import ProfileNav from './ProfileNavComponent/ProfileNav';
import { User } from '../../types';

const Header = (props: { user: User, setUser: any }) => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);

  return (
    <div>
    <h1 className='appTitle'>BOAST</h1>
    <ProfileNav user={props.user} setShowLoginModal={setShowLoginModal} />
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
