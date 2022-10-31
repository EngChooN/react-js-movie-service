import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
  return (
    <Router>
      {/* Route를 찾는 역할인 Switch */}
      <Switch>
        {/* Detail */}
        <Route path="/movie/:id">
          <Detail />
        </Route>
        {/* Home */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
