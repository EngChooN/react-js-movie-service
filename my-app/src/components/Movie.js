import MovieModuleCss from "./Movie.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Movie({ movieId, movieTitle, movieCoverImg, movieRating }) {
  return (
    <div className={MovieModuleCss.movieInfoWrapper}>
      <Link
        to={`/movie/${movieId}`}
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img className={MovieModuleCss.thumb} src={movieCoverImg} />
        <div className={MovieModuleCss.thumbTxt}>click more info</div>
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
  movieCoverImg: PropTypes.string.isRequired,
  movieRating: PropTypes.number.isRequired,
};

export default Movie;
