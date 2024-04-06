import React, { useEffect, useState, useHistory } from "react";
import "./login.css";
import Form from "react-bootstrap/Form";

function Login() {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(""); // State to store the selected user
  const [selectedUserPassword, setSelectedUserPassword] = useState(""); // State to store the password of the selected user
  const [enteredPassword, setEnteredPassword] = useState(""); // State to store the entered password

  // Fetch users data from the server
  useEffect(() => {
    fetch("http://localhost:8081/users")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  // Function to handle selection change
  const handleSelectionChange = (event) => {
    const selectedUsername = event.target.value;
    setSelectedUser(selectedUsername);

    // Find the selected user in the data array and set the corresponding password
    const selectedUserData = data.find(
      (user) => user.role === (selectedUsername || !"Default selection")
    );
    setSelectedUserPassword(selectedUserData ? selectedUserData.password : "");
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (enteredPassword === selectedUserPassword) {
      console.log("Password matched!");
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
          <Form.Control placeholder="User name"  />

          <Form.Label>Role</Form.Label>
          <Form.Select onChange={handleSelectionChange} value={selectedUser}>
            <option>Default select</option>
            {data.map((user, index) => (
              <option key={index}>{user.role}</option>
            ))}
          </Form.Select>

          {/* new section */}

          <Form.Label>Disabled input</Form.Label>
          <Form.Control placeholder="Disabled input" disabled />

          <Form.Label>Disabled select menu</Form.Label>
          <Form.Select disabled>
            <option>Disabled select</option>
          </Form.Select>

          <Form.Check type="checkbox" label="Can't check this" disabled />

          {/* new section done  */}

          <br />
          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            aria-describedby="passwordHelpBlock"
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text>
          <br />
          <button type="submit">Submit</button>
        </Form>
      </div>
      <div className="right-column"></div>
    </div>
  );
}

export default Login;
