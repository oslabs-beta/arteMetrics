import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Particles from 'react-particles-js';
import './App.css';
import MainContainer from './components/MainContainer.jsx';
import 'animate.css/animate.min.css';
import './styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Features from './components/Features.jsx';
import Hero from './components/Hero.jsx';
import TopNavBar from './components/TopNavBar.jsx';

const client = new ApolloClient({
  uri: 'http://localhost:3000'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <h1>arteMetrics under construction...</h1> */}
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
        <TopNavBar />
        <Hero />
        <Features />
        <MainContainer />
      </div>
    </ApolloProvider>
  );
}

export default App;
