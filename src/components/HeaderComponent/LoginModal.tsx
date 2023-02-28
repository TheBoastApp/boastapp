import { useState } from 'react';

import userService from '../../services/userService';
import { User } from '../../types';

/*
  Component that returns a form for users to login

  Captures entered information and uses states to sends
  the captured information back to LoginModal component
*/
const LoginForm = (props: {
  email: string,
  setEmail: any,
  password: string,
  setPassword: any }) => {

// on change handlers to capture info entered into form fields
  const handleEmailOnChange = (event: any) => {
    props.setEmail(event.target.value);
  };

  const handlePasswordOnChange = (event: any) => {
    props.setPassword(event.target.value);
  };

  return (
    <form onSubmit={() => console.log('hello!')}>
      <label htmlFor='email'>Email: </label>
      <input
        type='text'
        id='email'
        name='email'
        value={props.email}
        onChange={handleEmailOnChange}
        /><br />
      <label htmlFor='password'>Password: </label>
      <input
        type='password'
        id='password'
        name='password'
        value={props.password}
        onChange={handlePasswordOnChange}
        /><br />
    </form>
  );
}

/*
  Main component that contains login functionality
  Rendered by Header component
*/
const LoginModal = (props: {
  showLoginModal: boolean,
  setShowLoginModal: any,
  setShowSignUpModal: any,
  user: User | undefined,
  setUser: any }) => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean>(false);
  // console.log('User:', props.user);

// if user clicks out, get rid of modal and clear fields
  const handleLoginClose = () => {
    props.setShowLoginModal(false);
    setEmail('');
    setPassword('');
  };

  /*
    Captures login information to make a GET request to the
    DB, then populates the application's user state
    with the returned user
  */
  const handleLoginClick = () => {
    // make a GET request to the DB
    userService
      .getUser(email, password)
      .then(
        returnedUser => {
          if (returnedUser) {
            props.setUser(returnedUser);
            console.log('returned user:', returnedUser);
            setLoginError(false);
            props.setShowLoginModal(false);
          } else {
            console.log('user not found');
            setLoginError(true);
          }
        });

    setEmail('');
    setPassword('');
  };

// if user chooses to sign up, display sign up modal
  const handleSignUpClick = () => {
    props.setShowLoginModal(false);
    props.setShowSignUpModal(true);
  }

  if (!props.showLoginModal) {
    return null;
  }

  return (
    <div className='loginModal' onClick={handleLoginClose}>
      <div className='loginModalContent' onClick={e => e.stopPropagation()}>
        <div className='loginModalHeader'>
          <h4 className='loginModalTitle'>Log in to continue</h4>
          <div className='loginModalBody'>
            <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            />
            {loginError &&
              <p>Login credentials incorrect. Please try again.</p>
            }
          </div>
        </div>
        <div className='loginModalFooter'>
          <button
            className='loginModalButton'
            onClick={handleLoginClick}>
            Log in
          </button>
          <button
            className='loginModalButton'
            onClick={handleSignUpClick}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
