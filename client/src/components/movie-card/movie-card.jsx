import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import './movie-card.scss';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="card">
      <Card className="card" style={{ width: '16rem' }}>
        <Card.Img variant="top" src={movie.imagePath} />
        <Card.Body>
          <Card.Title className="card-title">{movie.title}</Card.Title>
          {/* <Card.Text>{movie.plot}</Card.Text> */}
          <Link to={`/movies/${movie._id}`}>
            <button className="btn-primary">Details</button>
          </Link>
        </Card.Body>
      </Card>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.number,
      death: PropTypes.number
    }).isRequired,
    year: PropTypes.number.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired,
    plot: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired,
    imagePath: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func
};