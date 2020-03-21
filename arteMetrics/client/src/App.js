import React from 'react';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import 'animate.css/animate.min.css';
import './styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TopNavBar from './components/TopNavBar.jsx';
import MainContainer from './components/MainContainer.jsx';

import Home from './components/Home.jsx';

function App() {
  return (
    <div>
      <TopNavBar />
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/metrics" component={MainContainer} />
      </Router>
    </div>
  );
}

export default App;
