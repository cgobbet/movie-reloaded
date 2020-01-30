import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { Link } from "react-router-dom";
import './profile-view.scss'

export function ProfileUpdate(props) {
  const {
    username: oldUsername,
    password: oldPassword,
    email: oldEmail,
    birthday: oldBirthday
  } = props.userInfo;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  useEffect(() => {
    setUsername(oldUsername);
    setPassword(oldPassword);
    setEmail(oldEmail);
    setBirthday(oldBirthday);
  }, [oldUsername, oldPassword, oldEmail, oldBirthday]);

  const user = props.user;

  const handleUpdate = e => {
    e.preventDefault();
    const userInfo = {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    };

    axios.put(`https://flix-app-test.herokuapp.com/users/${user}`, userInfo, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
        props.updateUser(userInfo);
        alert("Profile Updated");
      })
      .catch(e => {
        const errors = e.response.data.errors || [];
        let errorMessage = "";
        errors.forEach(err => {
          errorMessage += err.msg;
        });
        alert(`There was an error ${errorMessage}`);
        console.log(`Error updating the user info.`);
      });
  };
    const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`https://flix-app-test.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(response => {
        alert("Your account has been deleted");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.open("/", "_self");
      })
      .catch(e => {
        alert("Error deleting your account");
      });
  };

  return (
    <Container>
      <Row>
        <Form className="update-form">
          {/* <div>
            <b>
              <p>Update your info here:</p>
            </b>
          </div> */}
          <div>
            <Form.Group controlId="formNewUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                placeholder="MM/DD/YYYY"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
              />
            </Form.Group>
            <div>
              <Button
                id="btn-primary"
                variant="secondary"
                type="submit"
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Link to={`/users/${user}`}>
                <Button id="btn-primary">Profile</Button>
              </Link>
              <Link to={`/`}>
                <Button id="btn-primary">Back to Movies</Button>
              </Link>
              <div className="delete-account">
                <Button
                  className="btn-delete"
                  variant="danger"
                  type="submit"
                  onClick={handleDelete}
                >
                  Delete profile
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Row>
    </Container>
  );
}