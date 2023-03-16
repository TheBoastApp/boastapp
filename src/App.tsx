import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import { useState } from 'react';

import Header from './components/HeaderComponent/Header';
import MainNewWinForm from './components/MainNewWinComponent/MainNewWinForm';
import { User } from './types';

type ContextType = { user: User | undefined, setUser: any };

const App = () => {
  const [user, setUser] = useState<User | undefined>();

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Outlet context={{ user, setUser }}/>
    </div>
  );
}

export function useUser() {
  return useOutletContext<ContextType>();
}

export default App;
