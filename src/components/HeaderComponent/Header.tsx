import { useState } from 'react';

import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import ProfileNav from './ProfileNavComponent/ProfileNav';
import { User } from '../../types';

const Header = (props: { user: User | undefined, setUser: any }) => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  return (
    <div>
    <h1 className='appTitle'>
      <a style={{ textDecoration: 'none', color: '#000000'}} href="/">BOAST</a>
    </h1>
    <ProfileNav
      user={props.user}
      setUser={props.setUser}
      setShowLoginModal={setShowLoginModal}
      showProfileModal={showProfileModal}
      setShowProfileModal={setShowProfileModal}/>
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
