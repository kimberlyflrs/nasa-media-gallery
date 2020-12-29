import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import About from './components/about.js';
import Home from './components/home.js';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/about" component={About}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;