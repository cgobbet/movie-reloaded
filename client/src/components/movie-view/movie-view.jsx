import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import { MainView } from "../main-view/main-view";
import "./movie-view.scss";

export function MovieView(props) {
  const { movie } = props;
  if (!movie) return null;

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        `https://flix-app-test.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/movies/${movie._id}`,
        {
          username: localStorage.getItem("user")
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        console.log(response);
        alert("Movie has been added to your Favorite List!");
      })
      .catch(event => {
        console.log("error adding movie to favorites");
        alert("Movie not added to favorites!");
      });
  }

  return (
    <Container>
      <Row>
        <div className="movie-view">
          <img className="movie-poster" src={movie.imagePath} />
          <div className="movie-title">
            {/* <span className="label">Title: </span> */}
            <span className="value">{movie.title}</span>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.director.name}</span>
          </div>
          <div className="movie-description">
            {/* <span className="label">Description: </span> */}
            <span className="value">{movie.plot}</span>
          </div>

          <div className="movie-genre">
            {/* <span className="label">Genre: </span> */}
            <span className="value">{movie.genre.name}</span>
          </div>

          <div>
            <Link to={`/directors/${movie.director.name}`}>
              <button className="btn-primary" variant="link">
                Director
              </button>
            </Link>

            <Link to={`/genres/${movie.genre.name}`}>
              <button className="btn-primary" variant="link">
                Genre
              </button>
            </Link>
            <button
              className="btn-primary"
              onClick={event => handleSubmit(event)}
            >
              {" "}
              Add to Favorites{" "}
            </button>
            <Link to={`/`}>
              <button className="btn-primary">Back to Movies</button>
            </Link>
          </div>
        </div>
      </Row>
    </Container>
  );
}
