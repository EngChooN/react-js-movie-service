import HeaderCss from "./Header.module.css";

function Header({ inputChange, searchClick }) {
  const goHome = () => {
    window.location.replace("/");
  };
  return (
    <div className={HeaderCss.wrapper}>
      <img
        src={`${process.env.PUBLIC_URL}/img/movie-850.svg`}
        style={{
          width: "45px",
          float: "left",
          marginLeft: "30px",
          cursor: "pointer",
        }}
        onClick={goHome}
      />
      <div className={HeaderCss.searchWrapper}>
        <input
          className={HeaderCss.searchBar}
          placeholder="search"
          onChange={(e) => inputChange(e.target.value)}
        />
        <img
          src={`${process.env.PUBLIC_URL}/img/icons8-search-30.png`}
          className={HeaderCss.searchBtn}
          onClick={searchClick}
        />
      </div>
    </div>
  );
}

export default Header;
