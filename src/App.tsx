import React from "react";
import "./index.css";
import User from "./components/User";
import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";

function App() {
  const [role, setRole] = useState("bird");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Hannah",
      role: "Never had a job",
      image:
        "https://media.licdn.com/dms/image/D5603AQEnbNh-48HU6Q/profile-displayphoto-shrink_400_400/0/1672980786363?e=1680739200&v=beta&t=94FLpb3vXQKHTidgVJWrMN-nh4qH7ysgvUE5jLBurvg",
    },
    {
      id: 2,
      name: "Kat",
      role: "Software Engineer",
      image:
        "https://media.licdn.com/dms/image/D5603AQEjcre84lMKFQ/profile-displayphoto-shrink_400_400/0/1663706177584?e=1680739200&v=beta&t=zfGJNvfJfW3J771M99OP_KFzXGZpsyH1iIf4HFGhHk0",
    },
    {
      id: 3,
      name: "Baby",
      role: "bird",
      image:
        "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?",
    },
  ]);

  function updateUser(id: number, newName: string, newRole: string) {
    const updatedUsers = users.map((user) => {
      if (id == user.id) {
        return { ...user, name: newName, role: newRole };
      }
      return user;
    });
    setUsers(updatedUsers);
  }

  const showUsers = true;
  return (
    <div className="App">
      {showUsers ? (
        <>
          <input
            type="text"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          ></input>
          <div className="flex flex-wrap justify-center">
            {users.map((user) => {
              return (
                <User
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  role={user.role}
                  image={user.image}
                  updateUser={updateUser}
                />
              );
            })}
          </div>
        </>
      ) : (
        <p>you can't see the user</p>
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
