import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Quiz from "./views/Quiz";
import Login from "./views/Auth/Login";
import Final from "./views/Quiz/components/Final";

function App() {
  return (
    <div>
      <Router>
        {localStorage.token ? (
          <Switch>
            <Route exact path="/quiz" component={Quiz} />
            <Route exact path="/final" component={Final} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Login} />
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
