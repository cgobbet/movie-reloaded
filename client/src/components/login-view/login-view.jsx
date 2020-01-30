import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";


import "./login-view.scss";
import axios from "axios";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://flix-app-test.herokuapp.com/login", {
        username: username,
        password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data); // triggers onLoggedIn method on “main-view.jsx”
      })
      .catch(e => {
        console.log("no such user");
      });
  };

  return (
    <Container>
      <Row>
        <div>
          {/* <h1>Login</h1> */}
          <Form className="form">
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                placeholder="Enter username"
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <button className="btn-primary" onClick={handleSubmit}>
              Log in
            </button>
            <Link to={`/register`}>
              <button className="btn-primary">
              Signup!</button>
            </Link>
          </Form>
          <br />
        </div>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  onClick: PropTypes.func
};
