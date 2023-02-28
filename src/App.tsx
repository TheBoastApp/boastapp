import React from 'react';

import { useState } from 'react';

import Header from './components/HeaderComponent/Header';
import MainNewWinForm from './components/MainNewWinComponent/MainNewWinForm';
import { User } from './types';

const App = () => {
  const [user, setUser] = useState<User | undefined>();

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <h2 className="mainWinFormTitle">What's your latest win?</h2>
      <MainNewWinForm user={user} setUser={setUser} />
    </div>
  );
}

export default App;
