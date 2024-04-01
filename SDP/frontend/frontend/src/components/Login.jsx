import React, { useEffect, useState } from "react";
import "./login.css";
import Form from "react-bootstrap/Form";

function Login() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8081/users")
      .then((res) => res.json())
      .then((data) => setData(data)) // Set the fetched data to the state
      .catch((err) => console.log(err));
  }, []);

  return (
    <div class="login-body">
      <div class="left-column">
        <h1 className="heading">Log In</h1>
        <br />
        <Form.Label>Username</Form.Label>
        <Form.Select>
          <option>Default select</option>
          {data.map((user, index) => (
            <option key={index}>{user.fname}</option>
          ))}
        </Form.Select>

        <br />
        <br />
        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
        <Form.Control
          type="password"
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
        />
        <Form.Text id="passwordHelpBlock" muted>
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </Form.Text>
      </div>

      <div class="right-column"></div>
    </div>
  );
}

export default Login;
