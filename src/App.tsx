import React from "react";
import "./index.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Header from "./components/Header";
import AddWin from "./components/AddWin";
import EditWin from "./components/EditWin";
import Win from "./components/Win";

function App() {
  const [description, setDescription] = useState("learning");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState('');
  const [wins, setWins] = useState([
    {
      id: "1",
      name: "Learned React",
      description: "Watched literally so much YouTube",
    },
    {
      id: "2",
      name: "Made a webapp",
      description: "Sweating and crying",
    },
    {
      id: "3",
      name: "Fell asleep doing homework",
      description: "oops",
    },
  ]);

  function updateWin(id: string, newName: string, newDescription: string) {
    const updatedWins = wins.map((win) => {
      if (id === win.id) {
        return { ...win, name: newName, description: newDescription };
      }
      return win;
    });
    setWins(updatedWins);
  }

  function newWin(name: string, description: string) {
    const newWin = {
      id: uuidv4(),
      name: name,
      description: description,
    };
    setWins([...wins, newWin]);
  }

  const showWins = true;
  return (
    <div className="App bg-blue-400 min-h-screen">
      <Header />
      <AddWin newWin={newWin} />
      {showWins ? (
        <>
          <div className="flex flex-wrap justify-center my-2">
            {wins.map((win) => {
              const editWin = (
                <EditWin
                  id={win.id}
                  name={win.name}
                  description={win.description}
                  updateWin={updateWin}
                />
              );
              return (
                <Win
                  key={win.id}
                  id={win.id}
                  name={win.name}
                  description={win.description}
                  editWin={editWin}
                />
              );
            })}
          </div>
        </>
      ) : (
        <p>you can't see the win</p>
      )}

      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  );
}

export default App;
