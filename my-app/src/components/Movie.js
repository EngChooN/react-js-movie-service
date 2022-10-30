import MovieModuleCss from "./Movie.module.css";
import { Link } from "react-router-dom";

function Movie({ movie, key }) {
  console.log(key);
  return (
    <div className={MovieModuleCss.movieInfoWrapper}>
      <img className={MovieModuleCss.thumb} src={movie.medium_cover_image} />
      <Link to={"/detail"}>
        <h2>{movie.title}</h2>
      </Link>
      {movie.genres.map((el, index) => (
        <span className={MovieModuleCss.genres}>{el}</span>
      ))}
      <p>{movie.rating} ⭐️</p>
    </div>
  );
}
export default Movie;
