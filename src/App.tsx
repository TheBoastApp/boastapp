import React from "react";
import "./index.css";
import Win from "./components/Win";
import { useState } from "react";
import AddWin from "./components/AddWin";
import EditWin from "./components/EditWin";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [description, setDescription] = useState("learning");
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
    <div className="App">
      <AddWin newWin={newWin} />
      {showWins ? (
        <>
          <input
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></input>
          <div className="flex flex-wrap justify-center">
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
