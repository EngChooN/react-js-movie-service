import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailCss from "./Detail.module.css";
import ReactPlayer from "react-player";

function Detail() {
  useEffect(() => {
    getMovieInfo();
  }, []);
  // const movieId = useParams();
  // {id: 0000}으로 값을 받기 때문에, 아래와 같이 더욱 편하게 파라미터를 가져올 수 있다.
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState([]);
  const [genres, setGenres] = useState([]);
  const [torrent, setTorrent] = useState([]);

  console.log("movieId", id);
  console.log("movieInfo state", movieInfo);
  console.log("#tag", movieInfo.genres);

  const getMovieInfo = async () => {
    const data = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log("getMovieInfoData", data);
    setMovieInfo(data.data.movie);
    setGenres(data.data.movie.genres);
    setTorrent(data.data.movie.torrents);
  };
  return (
    <div
      className={DetailCss.detailWrapper}
      style={{
        backgroundImage: `url(${movieInfo.background_image_original})`,
      }}
    >
      <div className={DetailCss.bgFilter}>
        <div className={DetailCss.leftWrapper}>
          <div className={DetailCss.title}>{movieInfo.title_long}</div>
          <img
            className={DetailCss.coverImg}
            src={movieInfo.large_cover_image}
            alt="thumb"
          />
          {movieInfo.yt_trailer_code === "" ? null : (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${movieInfo.yt_trailer_code}`}
              width="100%"
            />
          )}
          <div style={{ display: "flex" }}>
            {genres.map((el, idx) => (
              <span key={idx} className={DetailCss.genres}>
                #{el}
              </span>
            ))}
          </div>
        </div>
        <div className={DetailCss.rightWrapper}>
          <div className={DetailCss.intro}>{movieInfo.description_full}</div>
          <div className={DetailCss.infoWrapper}>
            <div style={{ marginBottom: "4px" }}>
              title: {movieInfo.title_english}
            </div>
            <div style={{ marginBottom: "4px" }}>year: {movieInfo.year}</div>
            <div style={{ marginBottom: "4px" }}>
              time: {movieInfo.runtime} min
            </div>
            <div style={{ marginBottom: "4px" }}>
              rating: {movieInfo.rating} ⭐️
            </div>
            <div>like: {movieInfo.like_count} 👍</div>
          </div>
          <div className={DetailCss.torrentWrapper}>
            <div style={{ fontSize: "18px" }}>Torrent</div>
            <ul style={{ marginBottom: "0px" }}>
              {torrent.map((el, index) => (
                <li style={{ marginBottom: "5px" }} key={index}>
                  <a href={el.url}>{el.url}</a>
                  <br />
                  <div style={{ fontSize: "13px", marginTop: "5px" }}>
                    {el.quality} / {el.size}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
