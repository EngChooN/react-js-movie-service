import { useEffect, useState } from "react";
import HomeCss from "./Home.module.css";
import Movie from "../components/Movie";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

function Home() {
  // useState
  // 최초 로딩 flag
  const [loadingState, setLoadingState] = useState(true);
  // reFetch 로딩 flag
  const [reFetchLoadingState, setReFetchLoadingState] = useState(false);
  // api 데이터를 담을 배열 형태의 state
  const [movieData, setMovieData] = useState([]);
  // 페이지 값
  const [pageState, setPageState] = useState(1);
  // 모달 flag 값
  const [modalState, setModalState] = useState(false);
  // 모달 데이터
  const [modalData, setModalData] = useState({
    title: "",
    thumb: "",
    lang: "",
    runtime: 0,
    year: 0,
    summary: "",
    genres: [],
    rating: 0,
    id: 0,
  });

  // function
  // 모달 열기&닫기 함수
  const modalFlagFunc = () => {
    if (modalState === false) {
      console.log("modal open");
      setModalState(true);
    } else {
      console.log("modal close");
      setModalData({});
      setModalState(false);
    }
  };
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
        setReFetchLoadingState(true);
      });
  };
  const changePageState = () => {
    setReFetchLoadingState(false);
    setPageState((currentValue) => currentValue + 1);
    apiReload();
  };
  // api 재호출 (기존 데이터 배열에 새로운 배열 추가로 저장)
  const apiReload = async () => {
    await fetch(
      `https://yts.mx/api/v2/list_movies.json?limit=21&page=${pageState}`
    )
      .then((response) => response.json())
      .then((data) => {
        // 추가로 불러온 변환 데이터, state 추가로 저장
        const newData = data.data.movies;
        const currentData = movieData;

        console.log("기존 데이터", movieData);
        console.log("새로 불러온 데이터", newData);
        setMovieData([...currentData, ...newData]);
        setReFetchLoadingState(true);
      });
  };

  // useEffect
  // 최초 api 호출
  useEffect(() => {
    console.log("loading 문구와 함께 api 호출");
    apiLoad();
  }, []);
  // 스크롤 감지 (함수 실행)
  useEffect(() => {
    // window.addEventListener("scroll", scrollFunc);
  });
  // pageState 비동기로 인한 문제처리
  useEffect(() => {
    console.log("pageState", pageState);
  }, [pageState]);
  return (
    <div>
      {modalState ? (
        <div className={HomeCss.modalBg}>
          <div className={HomeCss.modalWrapper}>
            <div className={HomeCss.modalTitle}>{modalData.title}</div>
            <div>{modalData.year}</div>
            <img src={modalData.thumb} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>Time: {modalData.runtime} min /</div>
              <div>/ Lang: {modalData.lang} /</div>
              <div>/ {modalData.rating}⭐️</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {modalData.genres.map((el) => (
                <div className={HomeCss.modalGenres}>#{el}</div>
              ))}
            </div>
            <div className={HomeCss.modalSummary}>
              {modalData.summary || "There is no introduction."}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link to={`/movie/${modalData.id}`} target="_blank">
                <button className={HomeCss.modalCloseBtn}>detail</button>
              </Link>
              <button
                style={{ marginLeft: "30px" }}
                className={HomeCss.modalCloseBtn}
                onClick={modalFlagFunc}
              >
                close
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          flexFlow: "wrap",
          justifyContent: "center",
        }}
      >
        {loadingState ? (
          <div className={HomeCss.loading}>
            <img
              src={`${process.env.PUBLIC_URL}/img/0008.gif`}
              className={HomeCss.loadingImg}
            />
            loading...
          </div>
        ) : (
          movieData.map((movie) => (
            <Fade>
              <Movie
                key={movie.id}
                modalFlagFunc={modalFlagFunc}
                setModalData={setModalData}
                movieId={movie.id}
                movieTitle={movie.title}
                movieGenres={movie.genres}
                movieCoverImg={movie.medium_cover_image}
                movieRating={movie.rating}
                movieLang={movie.language}
                movieRuntime={movie.runtime}
                movieYear={movie.year}
                movieSummary={movie.description_full}
              />
            </Fade>
          ))
        )}
      </div>
      {!reFetchLoadingState && !loadingState ? (
        <div className={HomeCss.loading2}>
          <img
            src={`${process.env.PUBLIC_URL}/img/0008.gif`}
            className={HomeCss.loadingImg}
          />
          loading...
        </div>
      ) : null}

      {reFetchLoadingState === true && loadingState === false ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button className={HomeCss.moreBtn} onClick={changePageState}>
            click more movies...
          </button>
        </div>
      ) : null}
    </div>
  );
}
export default Home;
