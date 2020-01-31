import "./main-view.scss";

import { Route, BrowserRouter as Router } from "react-router-dom";
import { setMovies, setUser } from "../../actions/actions";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { DirectorView } from "../director-view/director-view";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { GenreView } from "../genre-view/genre-view";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Link } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import MoviesList from "../movies-list/movies-list";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { ProfileUpdate } from "../profile-view/profile-update";
import { ProfileView } from "../profile-view/profile-view";
import React from "react";
import { RegistrationView } from "../registration-view/registration-view";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { connect } from "react-redux";

export class MainView extends React.Component {
  constructor() {
    super();
    // set the initial state
    this.state = {
      movies: [],
      user: null,
      userInfo: {}
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://flix-reloaded.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setMovies(response.data);
        localStorage.setItem("movies", JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getUser(token) {
    axios.get("https://flix-reloaded.herokuapp.com", {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => { // Assign the result to the state
      this.props.setUser(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  updateUser(data) {
    this.setState({
      userInfo: data
    });
    localStorage.setItem("user", data.username);
  }

    onLogOut(authData) {
    this.setState({
      user: null
    });
    window.open("/client", "_self");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("movies");
    this.setState({
      user: null
    });
    window.open("/client", "_self");
  }

  register() {
    this.setState({
      register: true
    });
  }

  render() {
    let { movies } = this.props;
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { user, userInfo, token } = this.state;

    // Before the movies have been loaded
    // if (!movies) return <div className="main-view" />;

    return (
      <div>
        <Router basename="/client">
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
              </Nav>
              {!!user && (
                <button className="btn-primary" onClick={() => this.onLogOut()}>
                  Log Out
                </button>
              )}
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
                  return <MoviesList movies={movies} />;
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
// #3
let mapStateToProps = state => {
  return { movies: state.movies }
}

// #4
export default connect(mapStateToProps, { setMovies } )(MainView);
