import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import "./main-view.scss";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileUpdate } from "../profile-view/profile-update";


export class MainView extends React.Component {
  constructor() {
    super();
    // set the initial state
    this.state = {
      movies: [],
      user: null,
      email: "",
      birthday: "",
      userInfo: {}
    };
  }

  getMovies(token) {
    axios
      .get("https://flix-app-test.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
        localStorage.setItem("movies", JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getUser(token, user) {
      let username = localStorage.getItem('user');
      axios
        .get(`https://flix-app-test.herokuapp.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          // Assign the result to the state
          this.setState({
            email: response.data.email,
            birthday: response.data.birthday,
            token: token,
            userInfo: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    updateUser(data) {
    this.setState({
      userInfo: data
    });
    localStorage.setItem("user", data.username);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }

  // onMovieClick(movie) { // try to delete
  //   this.setState({
  //     selectedMovie: movie
  //   });
  // }

  /*  updates user state on login FROM LOGIN-VIEW */
  onLoggedIn(authData) {
    // need to use both the user and the token
    console.log(authData); // authData logged in console
    this.setState({
      user: authData.user.username //authData.user.username saved in userState
    });
    // saves token and user from handleSubmit in local storage
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token); // retrieves films list
    this.setState({
      userInfo: authData.user
    });
  }

    onLogOut(authData) {
    this.setState({
      user: null
    });
    window.open("/", "_self");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("movies");
    this.setState({
      user: null
    });
    window.open("/", "_self");
  }

  // onSignedIn(user) { // try to delete
  //   this.setState({
  //     user: user,
  //     register: false
  //   });
  // }

  register() {
    this.setState({
      register: true
    });
  }

  // alreadyMember(registeredUser) { // try to delete
  //   this.setState({
  //     registeredUser
  //   });
  // }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, user, register, userInfo, token } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div>
        <Router>
          {/* <Router basename="/client"> */}
          <Navbar bg="light" expand="lg">
            <Navbar.Brand id="navbar-brand">myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link to={`/`}>
                  {!!user && <Nav.Link href="#home">Home</Nav.Link>}
                </Link>
                <Link to={`/users/${user}`}>
                  {!!user && <Nav.Link href="#link">Profile</Nav.Link>}
                </Link>
                {/* {!!user && (
                  <Nav.Link onClick={() => this.onLogOut()}>Logout</Nav.Link>
                )} */}
              </Nav>
              {!!user && (
                <Button className="btn-primary" onClick={() => this.onLogOut()}>
                  Log Out
                </Button>
              )}
              {/* <Form inline>
                <FormControl
                  type="text"
                  placeholder="FlixSearch"
                  className="mr-sm-2"
                />
                <Button className="btn-primary" onClick={() => this.onLogOut()}>
                  Search
                </Button>
              </Form> */}
            </Navbar.Collapse>
          </Navbar>

          <Container>
            <Row>
              <Route
                exact
                path="/"
                render={() => {
                  if (!user)
                    return (
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    );
                  return movies.map(m => <MovieCard key={m._id} movie={m} />);
                }}
              />
              <Route path="/register" render={() => <RegistrationView />} />

              <Route
                path="/movies/:movieId"
                render={({ match }) => (
                  <MovieView
                    movie={movies.find(m => m._id === match.params.movieId)}
                  />
                )}
              />

              <Route
                path="/directors/:name"
                render={({ match }) => {
                  if (!movies) return <div className="main-view" />;
                  return (
                    <DirectorView
                      director={
                        movies.find(m => m.director.name === match.params.name)
                          .director
                      }
                    />
                  );
                }}
              />

              <Route
                path="/genres/:name"
                render={({ match }) => {
                  if (!movies) return <div className="main-view" />;
                  return (
                    <GenreView
                      genre={
                        movies.find(m => m.genre.name === match.params.name)
                          .genre
                      }
                    />
                  );
                }}
              />

              <Route
                path="/users/:user"
                render={({ match }) => {
                  return <ProfileView userInfo={userInfo} />;
                }}
              />

              <Route
                path="/update/:username"
                render={() => (
                  <ProfileUpdate
                    userInfo={userInfo}
                    user={user}
                    token={token}
                    updateUser={data => this.updateUser(data)}
                  />
                )}
              />
            </Row>
          </Container>
        </Router>
      </div>
    );
  }
}
