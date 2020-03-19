import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import Particles from 'react-particles-js';
import { ApolloProvider } from 'react-apollo';
import 'animate.css/animate.min.css';
import './styles/styles.css';

const client = new ApolloClient({
  uri: 'http://localhost:3000'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
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
        <h1>Hello World</h1>
        {/* <TopNavbar />
      <Hero />
      <Features /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
