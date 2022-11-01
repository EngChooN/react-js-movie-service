import { useEffect, useRef, useState } from "react";
import HomeCss from "./Home.module.css";
import Movie from "../components/Movie";

function Home() {
  // useEffect
  // 최초 api 호출
  useEffect(() => {
    console.log("loading 문구와 함께 api 호출");
    apiLoad();
  }, []);
  // 스크롤 감지 (함수 실행)
  useEffect(() => {
    window.addEventListener("scroll", scrollFunc);
  });

  // function
  // 스크린 최하단 감지
  const scrollFunc = () => {
    if (
      window?.scrollY + window?.innerHeight >=
      document?.documentElement?.scrollHeight
    ) {
      setPageState((currentValue) => currentValue + 1);
      console.log("스크린 바닥 감지하고 api 호출!!");
      apiReload();
    }
  };
  // api 호출 (데이터 배열 생성)
  const apiLoad = async () => {
    await fetch(
      `https://yts.mx/api/v2/list_movies.json?limit=21&page=${pageState}`
    )
      .then((response) => response.json())
      .then((data) => {
        // 변환 데이터 state 저장
        console.log(data.data.movies);
        setMovieData(data.data.movies);
        console.log("api 호출 후, loading 문구 OFF");
        setLoadingState(false);
      });
  };
  // api 재호출 (기존 데이터 배열에 새로운 배열 추가로 저장)
  const apiReload = async () => {
    await fetch(
      `https://yts.mx/api/v2/list_movies.json?limit=21&page=${pageState}`
    )
      .then((response) => response.json())
      .then((data) => {
        // 추가로 불러온 변환 데이터, state 추가로 저장
        console.log(data.data.movies);
        setMovieData((currentDataArray) => [
          ...currentDataArray,
          data.data.movies,
        ]);
      });
  };

  // useState
  // 최초 로딩 flag
  const [loadingState, setLoadingState] = useState(true);
  // api 데이터를 담을 배열 형태의 state
  const [movieData, setMovieData] = useState([]);
  // 페이지 값
  const [pageState, setPageState] = useState(1);

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "wrap",
        justifyContent: "center",
      }}
    >
      {loadingState ? (
        <div className={HomeCss.loading}>loading...</div>
      ) : (
        movieData.map((movie) => (
          <Movie
            key={movie.id}
            movieId={movie.id}
            movieTitle={movie.title}
            movieGenres={movie.genres}
            movieCoverImg={movie.medium_cover_image}
            movieRating={movie.rating}
          />
        ))
      )}
    </div>
  );
}
export default Home;
