import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import About from './components/about.js';
import Home from './components/home.js';
import Result from './components/result.js';
import ResultRoute from './components/ResultRoute';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import ResultState from "./context/resultContext/ResultState";
const App = () => {
    return (
      <ResultState>
        <Router>
          <Switch>
          <Route exact path="/nasa-image-gallery" component={Home}></Route>
          <Route exact path="/nasa-image-gallery/about" component={About}></Route>
          <ResultRoute exact path="/nasa-image-gallery/results/:id" component={Result}></ResultRoute>
          <Route path='*' exact={true} component={Home} />
          </Switch>
        </Router>
      </ResultState>
    );
}

export default App;