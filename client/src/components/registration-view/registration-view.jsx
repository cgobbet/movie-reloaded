import React, { useState } from "react";
import axios from "axios";

import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  // need to update handleSubmit to prevent refresh
  const handleRegister = e => {
    e.preventDefault();
    axios
      .post("https://flix-app-test.herokuapp.com/users", {
        username: username,
        password: password,
        email: email,
        birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open("/client", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.error(
          "the user is already registered and maybe something else!"
        );
      });
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    // props.onLoggedIn(username);
  };

  return (
    <div className="update-info">
      <h1>Signup for myFlix!</h1>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Enter the username you want to use"
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter a password"
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday Date</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
              placeholder="Enter your birthday date"
            />
          </Form.Group>
        </Form.Group>
        <Button onClick={handleRegister}>Submit</Button>
      </Form>
    </div>
  );
}
