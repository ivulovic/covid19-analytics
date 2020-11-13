import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import CovidPage from "./containers/Covid";
import AboutPage from "./containers/About";
import NotFoundPage from "./containers/NotFound";

function App() {
  return (
    <Router>
      <div>

        <Header />

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
            <AboutPage />
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
