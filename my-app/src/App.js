import { useEffect, useState } from "react";

function App() {
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
        <div>loading...</div>
      ) : (
        movieData.map((movie, index) => (
          <div key={index}>
            <img src={movie.large_cover_image} />
            <h2>{movie.title}</h2>
            <span>{movie.rating}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
