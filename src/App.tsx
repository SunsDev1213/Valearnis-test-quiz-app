import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";
import Quiz from "./views/Quiz";
import Login from "./views/Auth/Login";
import Final from "./views/Quiz/components/Final";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={Login} />
          {localStorage.token && <Route exact path="/quiz" component={Quiz} />}
          {localStorage.token && (
            <Route exact path="/final" component={Final} />
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
