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
      style={{
        backgroundImage: `url(${movieInfo.background_image_original})`,
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "hidden",
      }}
    >
      <div
        className={DetailCss.bgFilter}
        style={{
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px",
            paddingTop: "50px",
            marginBottom: "50px",
          }}
        >
          <div className={DetailCss.title}>{movieInfo.title_long}</div>
          <div className={DetailCss.rating}>{movieInfo.rating}⭐️</div>
        </div>
        <img className={DetailCss.coverImg} src={movieInfo.large_cover_image} />
        <div style={{ display: "flex" }}>
          {genres.map((el, idx) => (
            <span key={idx} className={DetailCss.genres}>
              {el}
            </span>
          ))}
        </div>
        <div className={DetailCss.intro}>{movieInfo.description_intro}</div>
      </div>
    </div>
  );
}

export default Detail;
