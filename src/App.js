import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CovidPage from "./containers/Covid";
import DetailsPage from "./containers/Details";
import NotFoundPage from "./containers/NotFound";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/details">About</Link>
          </li>
          <li>
            <Link to="/404">Not found</Link>
          </li>
        </ul>

        <hr />

        {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
        <Switch>
          <Route exact path="/">
            <CovidPage />
          </Route>
          <Route path="/details">
            <DetailsPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
