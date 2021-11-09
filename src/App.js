import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//! import pages
import Home from "./pages/Home";
import About from "./pages/About";
import SingleCocktail from "./pages/SingleCocktail";
import Error from "./pages/Error";
import Random from "./pages/Random";
//! import components
import Navbar from "./components/Navbar";
//! main return
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route  path="/random">
            <Random />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/cocktail/:id">
            <SingleCocktail />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
