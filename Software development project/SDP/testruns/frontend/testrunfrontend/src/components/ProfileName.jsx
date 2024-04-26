import React, { useEffect, useState } from "react";
import { useContext } from "react";
import App, { AppCustomeContext } from "../App";
import axios from "axios";

function ProfileName() {
  const { setName, name } = useContext(AppCustomeContext);
  const [newName, setNewName] = useState();
  const [users, setUsers] = useState([{}]);

  // useEffect(() => {
  //   fetch("/users")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUsers(data);
  //       console.log(users);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/notes");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


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
