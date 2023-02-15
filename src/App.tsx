import React from 'react';

import { useState } from 'react';
import Header from './components/HeaderComponent/Header';
import './index.css';

const unknownUser = {
  firstName: "",
  lastName: "",
  email: "@gmail.com",
  password: "",
  profilePic: "",
  positions: []};

const App = () => {
  const [user, setUser] = useState(unknownUser);

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <p>{user.firstName.length > 0 ? `Hello ${user.firstName}` : ''}</p>
    </div>
  );
}

export default App;
