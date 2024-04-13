import React, { useState } from "react";
import { useContext } from "react";
import App, { AppCustomeContext } from "../App";

function ProfileName() {
  const { setName ,name} = useContext(AppCustomeContext);
  const [newName, setNewName] = useState();

  return (
    <div>
      <h1>This is the Profile name : {name}</h1>
      <input
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <button
        onClick={() => {
          setName(newName);
        }}
      >
        click me{" "}
      </button>
    </div>
  );
}

export default ProfileName;
