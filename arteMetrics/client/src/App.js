import React from 'react';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './styles/styles.css';

import Particles from 'react-particles-js';
import TopNavBar from './components/TopNavBar.jsx';
import MainContainer from './components/MainContainer.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';

function App() {
  return (
    <div className="App">
      <TopNavBar />

      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/metrics" component={MainContainer} />
        <Route path="/login" component={Login} />
      </Router>
      <div id="particles">
        <Particles
          className="landing-bg"
          params={{
            particles: {
              number: {
                value: 100
              },
              size: {
                value: 3
              }
            },
            interactivity: {
              detect_on: 'window',
              events: {
                onhover: {
                  enable: true,
                  mode: 'repulse'
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
