import React from "react";
import { connect } from "react-redux";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  // if (visibilityFilter !== "") {
  //   filteredMovies = movies.filter(m => m.title.includes(visibilityFilter));
  // }

  if (visibilityFilter !== "") {
    filteredMovies = filteredMovies.filter(m =>
      m.title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <div className="movies-list">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      {filteredMovies.map(m => (
        <MovieCard key={m._id} movie={m} />
      ))}
    </div>
  );
}

export default connect(mapStateToProps)(MoviesList);
/* 
the same as export default connect(mapStateToProps, null)(MoviesList);
mapStateToProps converts or transforms the store into props that the MoviesList -
*/