import MovieModuleCss from "./Movie.module.css";
import PropTypes from "prop-types";

function Movie({
  movieTitle,
  movieCoverImg,
  movieRating,
  modalFlagFunc,
  setModalData,
  movieLang,
  movieRuntime,
  movieYear,
  movieSummary,
  movieGenres,
  movieId,
  movieSummaryDetail,
}) {
  return (
    <>
      <div className={MovieModuleCss.movieInfoWrapper}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
          onClick={() => {
            modalFlagFunc();
            setModalData({
              title: movieTitle,
              thumb: movieCoverImg,
              lang: movieLang,
              runtime: movieRuntime,
              year: movieYear,
              summary: movieSummary,
              genres: movieGenres,
              rating: movieRating,
              id: movieId,
            });
          }}
        >
          <img className={MovieModuleCss.thumb} src={movieCoverImg} />
          <div className={MovieModuleCss.thumbTxt}>click more info</div>
        </div>
        <div className={MovieModuleCss.title}>{movieTitle}</div>
        <p className={MovieModuleCss.rating}>{movieRating}⭐️</p>
      </div>
    </>
  );
}

Movie.propTypes = {
  movieId: PropTypes.number.isRequired,
  movieTitle: PropTypes.string.isRequired,
  movieCoverImg: PropTypes.string.isRequired,
  movieRating: PropTypes.number.isRequired,
};

export default Movie;
