import React from "react";
import "./App.css";
import User from "./components/User";

function App() {
  {
    console.log("hi kat");
  }
  const showUsers = true;
  return (
    <div className="App">
      {showUsers ? (
        <>
          <User name="Hannah" />
          <User name="Kat" role="Software Engineer" />
        </>
      ) : (
        <p>you can't see the user</p>
      )}

      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
    </div>
  );
}

export default App;
