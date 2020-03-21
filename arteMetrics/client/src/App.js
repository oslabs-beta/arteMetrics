import React from 'react';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import 'animate.css/animate.min.css';
import './styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TopNavBar from './components/TopNavBar.jsx';
import MainContainer from './components/MainContainer.jsx';
import Login from './components/Login.jsx';
import Particles from 'react-particles-js';

import Home from './components/Home.jsx';

function App() {
  return (
    <div>
      <TopNavBar />
      <Particles
        className="landing-bg"
        params={{
          particles: {
            number: {
              value: 200
            },
            size: {
              value: 3
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              }
            }
          }
        }}
      />
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/metrics" component={MainContainer} />
        <Route path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
