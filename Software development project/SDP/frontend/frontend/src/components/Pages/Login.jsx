import React, { useEffect, useState } from "react";
import "../Stylings/login.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import image from '../../assets/constructor.png'

import { useContext } from "react";
import { AppCustomContext } from "../../App";
// import { AppCustomContext2 } from "../../main";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Login() {
  //components of the passing values
  const { setUsernamee, setRolee } = useContext(AppCustomContext);
  //const { handleClickVariant,setVarient ,varient} = useContext(AppCustomContext2);


  //passing value components are done

  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(""); // State to store the selected user
  const [selectedUserPassword, setSelectedUserPassword] = useState(""); // State to store the password of the selected user
  const [enteredPassword, setEnteredPassword] = useState(""); // State to store the entered password

  const [username, setUsername] = useState(""); // State to store the entered username

  useEffect(() => {
    fetch("http://localhost:8085/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
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
      navigate("/DashboardMain", { state: { role: selectedUser } });
      setUsernamee(username);
      setRolee(selectedUser);

    } else {
      console.log("Password does not match!");
      //setVarient('success')
      //handleClickVariant(varient);
    }
  };

  return (
    <div className="login-body">
      <div className="left-column">
        <Form className="form" onSubmit={handleSubmit}>
          <h1 className="heading">Log In</h1>
          <Form.Label>
            <FontAwesomeIcon icon={faUser} style={{ color: "#000000" }} />
            Username
          </Form.Label>
          <Form.Control
            placeholder="Username"
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
          <button className="submit-button" role="button">
            <span className="text"> Click me</span>
            <span>Login</span>
          </button>
        </Form>
      </div>
      <div className="right-column">
        <img src={image}/>
      </div>
    </div>
  );
}

export default Login;
