import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailCss from "./Detail.module.css";

function Detail() {
  // const movieId = useParams();
  // {id: 0000}으로 값을 받기 때문에, 아래와 같이 더욱 편하게 파라미터를 가져올 수 있다.
  const { id } = useParams();
  console.log("movieId", id);
  const [movieInfo, setMovieInfo] = useState([]);
  console.log("movieInfo state", movieInfo);
  const [genres, setGenres] = useState([]);
  const getMovieInfo = async () => {
    const data = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log("getMovieInfoData", data);
    setMovieInfo(data.data.movie);
    setGenres(data.data.movie.genres);
  };
  useEffect(() => {
    getMovieInfo();
  }, []);
  return (
    <div
      className={DetailCss.detailWrapper}
      style={{
        backgroundImage: `url(${movieInfo.background_image_original})`,
      }}
    >
      <div className={DetailCss.bgFilter}>
        <div>
          <div className={DetailCss.title}>{movieInfo.title_long}</div>
          <img
            className={DetailCss.coverImg}
            src={movieInfo.large_cover_image}
          />
          <div style={{ display: "flex" }}>
            {genres.map((el, idx) => (
              <span key={idx} className={DetailCss.genres}>
                #{el}
              </span>
            ))}
          </div>
          <div className={DetailCss.intro}>{movieInfo.description_intro}</div>
        </div>
        <div className={DetailCss.rightWrapper}>
          <div>
            <div>title: {movieInfo.title_english}</div>
            <div>year: {movieInfo.year}</div>
            <div>runtime: {movieInfo.runtime} min</div>
            <div>rating: {movieInfo.rating}</div>
            <div>like: {movieInfo.like_count}</div>
          </div>
          <div className={DetailCss.torrentWrapper}>
            <div>torrent-url</div>
            <ul>
              <li>
                {movieInfo.torrents.map((el) => (
                  <a href={el.url}>{el.url}</a>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
