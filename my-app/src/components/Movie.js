import MovieModuleCss from "./Movie.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Movie({
  movieId,
  movieTitle,
  movieGenres,
  movieCoverImg,
  movieRating,
}) {
  return (
    <div className={MovieModuleCss.movieInfoWrapper}>
      <Link
        to={`/movie/${movieId}`}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img className={MovieModuleCss.thumb} src={movieCoverImg} />
      </Link>
      <div className={MovieModuleCss.title}>{movieTitle}</div>
      {/* {movieGenres.map((el) => (
        <span className={MovieModuleCss.genres}>{el}</span>
      ))} */}
      <p className={MovieModuleCss.rating}>{movieRating}⭐️</p>
    </div>
  );
}

Movie.propTypes = {
  movieId: PropTypes.number.isRequired,
  movieTitle: PropTypes.string.isRequired,
  movieGenres: PropTypes.arrayOf(PropTypes.string.isRequired),
  movieCoverImg: PropTypes.string.isRequired,
  movieRating: PropTypes.number.isRequired,
};

export default Movie;
