import React, { useEffect, useState } from "react";
import "../Stylings/login.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AppCustomContext } from "../../App";



function Login() {
//components of the passing values
  const {setUsernamee,setRolee}=useContext(AppCustomContext);
  
  
//passing value components are done


  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(""); // State to store the selected user
  const [selectedUserPassword, setSelectedUserPassword] = useState(""); // State to store the password of the selected user
  const [enteredPassword, setEnteredPassword] = useState(""); // State to store the entered password

  const [username, setUsername] = useState(""); // State to store the entered username

  


  useEffect(() => {
    fetch("http://localhost:8083/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();

  const handleSelectionChange = (event) => {
    const selectedRole = event.target.value;
    setSelectedUser(selectedRole);

    // Find the selected user in the data array and set the corresponding password
    const selectedUserData = data.find(
      (user) => user.username === username && user.role === selectedRole
    );
    setSelectedUserPassword(selectedUserData ? selectedUserData.password : "");
  };

  const handleUserNameInput = (e) => {
    const enteredUsername = e.target.value;
    setUsername(enteredUsername);
  };
  const clickhandle = () => {};

  const handleSubmit = (event) => {
    event.preventDefault();

    // Find the user with matching fname and role
    const matchedUser = data.find(
      (user) => user.username === username && user.role === selectedUser
    );

    if (matchedUser && enteredPassword === matchedUser.password) {
      console.log("Password matched!");
      navigate("/DashboardMain", { state: { role:selectedUser} });
      setUsernamee(username);
      setRolee(selectedUser);
      
      

    } else {
      console.log("Password does not match!");
    }
  };








  return (
    <div className="login-body">
      <div className="left-column">
        <h1 className="heading">Log In</h1>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Label>User name</Form.Label>
          <Form.Control
            placeholder="User name"
            onChange={handleUserNameInput}
            value={username}
          />
          <br />
          <Form.Label>Role</Form.Label>
          <Form.Select onChange={handleSelectionChange} value={selectedUser}>
            <option>Default select</option>
            {data
              .filter((user) => user.username === username) // Filter data based on username
              .map((user, index) => (
                <option key={index}>{user.role}</option>
              ))}
          </Form.Select>

          <br />
          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            aria-describedby="passwordHelpBlock"
          />

          <br />
          <button type="submit">Submit</button>
        </Form>
      </div>
      <div className="right-column"></div>
    </div>
  );
}

export default Login;
