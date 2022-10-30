import { useEffect, useState } from "react";
import HomeCss from "./App.module.css";
import Movie from "../components/Movie";

function Home() {
  useEffect(() => {
    console.log("loading 문구와 함께 api 호출");
    fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
    )
      .then((response) => response.json())
      .then((data) => {
        // 변환 데이터 state 저장
        console.log(data.data.movies);
        setMovieData(data.data.movies);
        console.log("api 호출 후, loading 문구 OFF");
        setLoadingState(false);
      });
  }, []);

  const [loadingState, setLoadingState] = useState(true);
  const [movieData, setMovieData] = useState([]);

  return (
    <div>
      {loadingState ? (
        <div className={HomeCss.loading}>loading...</div>
      ) : (
        movieData.map((movie) => <Movie key={movie.id} movie={movie} />)
      )}
    </div>
  );
}
export default Home;
