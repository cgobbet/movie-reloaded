import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../../actions/actions";
/**
 * @description no need for a class component as it has no state and doesn’t need lifecycle hooks
 */
function VisibilityFilterInput(props) {
  return (
    <Form.Control
      onChange={e => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Type the title of the movie"
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
