import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Search from "./routes/Search";

function App() {
  return (
    <Router>
      {/* <Header /> */}
      {/* Route를 찾는 역할인 Switch */}
      <Switch>
        {/* Detail */}
        <Route path="/movie/:id">
          <Detail />
        </Route>
        {/* Home */}
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/search/:search">
          <Search />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
