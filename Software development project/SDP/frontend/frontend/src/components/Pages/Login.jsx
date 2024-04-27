import React, { useEffect, useState } from "react";
import "../Stylings/login.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import image from "../../assets/constructor.png";
import Snack from "./Snack";
import axios from "axios";

import { useContext } from "react";
import { AppCustomContext } from "../../App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser, faWrench } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap/";
import DashboardCategoryBtn from "../Buttons/DashboardButtons";

function Login() {
  const { setUsernamee, setRolee } = useContext(AppCustomContext);

  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserPassword, setSelectedUserPassword] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [username, setUsername] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:8085/users")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       console.log("This is the useEffect", data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  //if you want to use a base URL and do the axios use this 
  // axios.defaults.baseURL = "http://localhost:8085";
  // { url: "/users" }

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8085/users")
        .then((res) => setData(res.data))
    } catch (error) {
      console.error("error occured in the try catch block",error);
    }
  },[]);

  // useEffect(() => {
  //   console.log(data); // Log data whenever it changes
  // }, [data]);

  const navigate = useNavigate();

  //check the roles with the realtime entering username
  const handleSelectionChange = (event) => {
    const selectedRole = event.target.value;
    setSelectedUser(selectedRole);

    const selectedUserData = data.find(
      (users) => users.username === username && users.role === selectedRole
    );
    setSelectedUserPassword(selectedUserData ? selectedUserData.password : "");
  };

  const handleUserNameInput = (e) => {
    const enteredUsername = e.target.value;
    setUsername(enteredUsername);
  };

  //Form submit part
  const handleSubmit = (event) => {
    event.preventDefault();

    const matchedUser = data.find(
      (users) => users.username === username && users.role === selectedUser
    );

    if (matchedUser && enteredPassword === matchedUser.password) {
      console.log("Password matched!");
      navigate("/DashboardMain", { state: { role: selectedUser } });
      setUsernamee(username);
      setRolee(selectedUser);
      //This will not display since the page is refresh
      setMessage("success");
      SetMessageContent("Password is correct");
      setOpen(true);
    } else {
      console.log("Password does not match!");
      // Open the Snackbar with error message
      setMessage("error");
      SetMessageContent("Username or Password is incorrect");
      setOpen(true);
    }
  };

  //Snackbar content
  const [messageContent, SetMessageContent] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //snackbar content is over
  return (
    <div className="login-body">
      <div className="left-column">
        <Form className="form" onSubmit={handleSubmit}>
          <h1 className="heading">Log In</h1>
          <Form.Label>
            <FontAwesomeIcon icon={faUser} style={{ color: "#000000" }} />
            &nbsp;&nbsp;&nbsp;Username
          </Form.Label>
          <Form.Control
            placeholder="Username"
            onChange={handleUserNameInput}
            value={username}
          />
          <br />
          <Form.Label>
            <FontAwesomeIcon icon={faWrench} style={{ color: "#000000" }} />
            &nbsp;&nbsp;&nbsp;Role
          </Form.Label>
          <Form.Select onChange={handleSelectionChange} value={selectedUser}>
            <option>Default select</option>
            {data
              .filter((users) => users.username === username)
              .map((users, index) => (
                <option key={index}>{users.role}</option>
              ))}
          </Form.Select>

          <br />
          <Form.Label htmlFor="inputPassword5">
            <FontAwesomeIcon icon={faKey} style={{ color: "#000000" }} />
            &nbsp;&nbsp;&nbsp;Password
          </Form.Label>
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

          <Button variant="primary" role="button" onClick={handleSubmit}>Primary</Button>
          

          {/* Render the Snack component */}
          <Snack
            type={message}
            message={messageContent}
            open={open}
            handleClose={handleClose}
          />
        </Form>
      </div>
      <div className="right-column">
        <img src={image} />
      </div>
    </div>
  );
}

export default Login;
