import React from "react";
import "./index.css";
import User from "./components/User";
import { useState } from "react";

function App() {
  const [role, setRole] = useState("bird");
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
            <User
              name="Hannah"
              image="https://media.licdn.com/dms/image/D5603AQEnbNh-48HU6Q/profile-displayphoto-shrink_400_400/0/1672980786363?e=1680739200&v=beta&t=94FLpb3vXQKHTidgVJWrMN-nh4qH7ysgvUE5jLBurvg"
            />
            <User
              name="Kat"
              role="Software Engineer"
              image="https://media.licdn.com/dms/image/D5603AQEjcre84lMKFQ/profile-displayphoto-shrink_400_400/0/1663706177584?e=1680739200&v=beta&t=zfGJNvfJfW3J771M99OP_KFzXGZpsyH1iIf4HFGhHk0"
            />
            <User
              name="Baby"
              role={role}
              image="https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=800"
            />
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
