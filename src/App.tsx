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
  positions: []
};

const NewWinForm = () => {
  return (
    <div style={{ marginLeft: '100px' }}>
      <form>
        <input
          value='enter your win...'
          style={{ width: '1000px', marginBottom: '20px'}}
          /><br />
        <label>Position: </label>
        <select style={{marginRight: '20px'}}>
          <option value='None'>Select a Position</option>
          <option value='Volvo'>Volvo</option>
        </select>
        <label>Goal: </label>
        <select>
          <option value='None'>Select a Goal</option>
          <option value='Volvo'>Volvo</option>
        </select>
      </form>
    </div>
  );
}

const App = () => {
  const [user, setUser] = useState(unknownUser);

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <h2 className="mainWinFormTitle">What's your latest win?</h2>
      <NewWinForm />
    </div>
  );
}

export default App;
