import React from 'react';
import axios from 'axios';
import Moment from "react-moment";
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import './profile-view.scss'

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userData: null,
      favorites: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let username = localStorage.getItem('user');
    axios.get(`https://flix-app-test.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        userData: response.data,
        username:response.data.username,
        password: response.data.password,
        email: response.data.email,
        birthday: response.data.birthday,
        favorites: response.data.favorites
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
// data: { movieId: favorite })
  removeFavorite(event, favorite) {
    event.preventDefault();
    console.log(favorite);
    axios
      .delete(`https://flix-app-test.herokuapp.com/users/${localStorage.getItem('user')}/movies/${favorite}`, 
    { 
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    // }, {movieId: favorite})
      // .then(response => {
      //   document.location.reload(true);
      // })
      .then(response => {
        this.getUser(localStorage.getItem('token'));
        // alert("Movie removed from the list");
      })
      .catch(err => {
        console.log(err.response);
        alert('Unable to remove movie from the list')
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { removeFavorite, userData, username, email, birthday, favorites } = this.state;
    return (
      <div>
        <Card className="profile-view" style={{ width: "34rem" }}>
          {/* <Card.Img className="profile-logo" variant="top" src={profileLogo} /> */}
          <Card.Body>
            <Card.Title className="profile-title">Profile</Card.Title>
            <ListGroup className="user-name">
              <ListGroup.Item>
                Username: <span className="user-value">{username}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                E-Mail: <span className="user-value">{email}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Birthday:
                <span className="user-value">
                  {/* {birthday} */}
                  <Moment format="DD/MM/YYYY">{birthday}</Moment>
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                Favorites:
                <div>
                  {favorites.length === 0 && (
                    <div className="value">
                      <span className="user-value">No Movies added so far</span>
                    </div>
                  )}
                  {favorites.length > 0 && (
                    <ul>
                      {favorites.map(favorite => (
                        <li key={favorite}>
                          <p>
                            {
                              JSON.parse(localStorage.getItem("movies")).find(
                                movie => movie._id === favorite
                              ).title
                            }

                            {/* <Link to={`/movies/${favorite}`}>
                          <Button size="sm" variant="info">
                            Details
                          </Button>
                        </Link> */}

                            {/* <Link to={`/movies/${favorite}`}>
                              {
                                JSON.parse(localStorage.getItem("movies")).find(
                                  movie => movie._id === favorite
                                ).title
                              }
                            </Link> */}
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={event =>
                                this.removeFavorite(event, favorite)
                              }
                            >
                              Remove
                            </Button>
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>

          <div className="update-info">
            <Container>
              <Row>
                <Link to={`/update/:username`}>
                  <Button id="btn-primary">Update</Button>
                </Link>
                <Link to={`/`}>
                  <Button id="btn-primary">Back to Movies</Button>
                </Link>
              </Row>
            </Container>
          </div>
        </Card>
      </div>
    );
  }
}