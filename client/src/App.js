import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import About from './components/about.js';
import Home from './components/home.js';
import Result from './components/result.js';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import ResultState from "./context/resultContext/ResultState";
const App = () => {
    return (
      <ResultState>
        <Router>
          <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/results" component={Result}></Route>
          </Switch>
        </Router>
      </ResultState>
    );
}

export default App;