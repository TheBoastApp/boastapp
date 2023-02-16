import { useState } from 'react';

import axios from 'axios';

// capture input fields
// when login is captured, do a DB search
// set current user to login fields

const LoginForm = (props: {
  email: string,
  setEmail: any,
  password: string,
  setPassword: any }) => {

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

// if click sign up, show sign up modal
const LoginModal = (props: {
  showLoginModal: boolean,
  setShowLoginModal: any,
  setShowSignUpModal: any,
  user: object,
  setUser: any }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // console.log('User:', props.user);

  const handleLoginClose = () => {
    props.setShowLoginModal(false);
    setEmail('');
    setPassword('');
  };

  const handleLoginClick = () => {
    // make a GET request to the DB
    axios
      .get(`http://localhost:3001/users?email=${email}`)
      .then(response => {
        const returnedUser = response.data[0];
        if (returnedUser.password === password) {
          props.setUser(returnedUser);
        }
      });

    setEmail('');
    setPassword('');

  };

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
