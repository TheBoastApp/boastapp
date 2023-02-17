import React from 'react';
import axios from 'axios';

import { useState } from 'react';

import userService from '../../services/userService';
import { User } from '../../types';

/*
  Component that returns a form for users to create a new account

  Captures entered information and uses states to sends
  the captured information back to SignUpModal component
*/
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


  /*
    onChange handlers to grab entered information and send
    back to SignUpModal component
  */
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

  // return a form back to SignUpModal
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

/*
  Main component that contains functionality to create an account
  Uses form to capture information, then uses states to send captured information
  back to Header >> App component
*/
const SignUpModal = (props: {
    showSignUpModal: boolean,
    setShowSignUpModal: any,
    setUser: any }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState('');

  if (!props.showSignUpModal) {
    return null;
  }

// if user clicks out, get rid of modal and clear form fields
  const handleSignUpClose = () => {
    props.setShowSignUpModal(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setProfilePic('');
  }

  const handleSignUpClick = () => {
    // use captured information to create a new user
    const newUserObject: User = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      profilePic: profilePic,
      positions: []
    }

    // make a POST request to DB with new user object
    console.log('Creating new user:', newUserObject);
    userService
      .createUser(newUserObject)
      .then(returnedUser => {
        props.setUser(returnedUser);
        console.log('new user:', returnedUser);
      });

    // get rid of sign up modal and clear form fields
    props.setShowSignUpModal(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setProfilePic('');
  };

// sign up div container
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
