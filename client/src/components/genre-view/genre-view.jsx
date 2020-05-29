import React from 'react';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import './genre-view.scss';

/**
 * @description Display Genre info on state
 */

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    return (
      <div>
        <div className="genre-name">{genre.name}</div>
        <div className="genre-description">
          <span className="value">{genre.description}</span>
        </div>
        <Link to={`/`}>
          <button className="btn-primary">Back to Movies</button>
        </Link>
      </div>
    );
  }
}