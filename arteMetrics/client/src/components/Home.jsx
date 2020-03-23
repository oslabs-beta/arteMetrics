import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Features from './Features.jsx';
import Hero from './Hero.jsx';
import 'animate.css/animate.min.css';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  uri: 'http://localhost:3000'
});
//just adding a comment

const Home = () => {
  return (
    <ApolloProvider client={client}>
      <div className="Home">
        <Hero />
        <Features />
      </div>
    </ApolloProvider>
  );
};

export default Home;
