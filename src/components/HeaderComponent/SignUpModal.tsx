import { useState } from 'react';
import React from 'react';

import axios from 'axios';

const SignUpForm = (props: {
  firstName: string,
  setFirstName: any,
  lastName: string,
  setLastName: any,
  email: string,
  setEmail: any,
  password: string,
  setPassword: any,
  profilePic: string,
  setProfilePic: any }) => {

  const handleFirstNameOnChange = (event: any) => {
    props.setFirstName(event.target.value);
  };
  const handleLastNameOnChange = (event: any) => {
    props.setLastName(event.target.value);
  };
  const handleEmailOnChange = (event: any) => {
    props.setEmail(event.target.value);
  };
  const handlePasswordOnChange = (event: any) => {
    props.setPassword(event.target.value);
  };

  const handleProfilePicOnChange = (event: any) => {
    props.setProfilePic(event.target.value);
  }


  return (
    <form onSubmit={() => console.log('hello!')}>
      <label htmlFor='firstName'>First Name: </label>
      <input
        type='text'
        id='firstName'
        name='firstName'
        value={props.firstName}
        onChange={handleFirstNameOnChange}
        /><br />
      <label htmlFor='lastName'>Last Name: </label>
      <input
        type='text'
        id='lastName'
        name='lastName'
        value={props.lastName}
        onChange={handleLastNameOnChange}
        /><br />
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
      <label htmlFor='profilePic'>Choose a Profile Picture: </label>
      <input
        type="file"
        id="profilePic"
        name="profilePic"
        value={props.profilePic}
        onChange={handleProfilePicOnChange}
        accept="image/png, image/jpeg"
        /><br />
    </form>
  );
}


const SignUpModal = (props: {
    showSignUpModal: boolean,
    setShowSignUpModal: any,
    setUser: any }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');
  // console.log(`firstName: ${firstName}\nlastName: ${lastName}\nEmail: ${email}\npassword: ${password}\nprofilePic: ${profilePic}`);

  if (!props.showSignUpModal) {
    return null;
  }

  const handleSignUpClose = () => {
    props.setShowSignUpModal(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setProfilePic('');
  }

  const handleSignUpClick = () => {
    // make a POST request to the DB
    const newUserObject = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      profilePic: profilePic,
      positions: []
    }

    axios
      .post('http://localhost:3001/users', newUserObject)
      .then(response => {
        props.setUser(response.data);
      });

    props.setShowSignUpModal(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setProfilePic('');
  };

  return (
    <div className='loginModal' onClick={handleSignUpClose}>
      <div className='loginModalContent' onClick={e => e.stopPropagation()}>
        <div className='loginModalHeader'>
          <h4 className='loginModalTitle'>Sign up for an account</h4>
          <div className='loginModalBody'>
            <SignUpForm
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              profilePic={profilePic}
              setProfilePic={setProfilePic}
            />
          </div>
        </div>
        <div className='loginModalFooter'>
          <button
            className='loginModalButton'
            onClick={handleSignUpClick}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpModal;
