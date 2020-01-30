import React from 'react';
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './director-view.scss';

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    return (
      <div>
        <div className="director-name">
          {director.name}
        </div>
        <div className="director-bio">
          <span className="value">{director.bio}</span>
        </div>
        <Link to={`/`}>
          <button className="btn-primary">Back to Movies</button>
        </Link>
      </div>
    );
  }
}
DirectorView.propTypes = {
  director: PropTypes.string
};