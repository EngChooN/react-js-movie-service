import Button from "./Button";
import AppCss from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  console.log("call api not useEffect");

  const [counter, setCounter] = useState(0);
  const clickBtn = () => {
    setCounter((prev) => prev + 1);
    console.log("click button!");
  };

  const [inputValue, setInputValue] = useState("");
  const onChangeInput = (e) => setInputValue(e.target.value);

  useEffect(() => {
    // 최초의 마운트 시, 한번만 api를 호출한다. (ex 글 리스트?)
    console.log("call api useEffect");
  }, []);
  useEffect(() => {
    // 다른 state의 렌더링을 해도 api를 호출하지 않는다.
    // 단 inputValue의 상태만 변할 때, api를 호출한다, (ex 검색결과?)
    console.log("search api");
  }, [inputValue]);

  return (
    <div className="App">
      <h1 className={AppCss.title}>Hello World!</h1>
      <h3>counter {counter} !</h3>
      <Button text={"Button Component"} clickFunction={clickBtn} />
      <button>Just Button</button>
      <h3>search value: {inputValue}</h3>
      <input onChange={onChangeInput} type={"text"} />
    </div>
  );
}

export default App;
