import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import MainContainer from '../src/components/MainContainer.jsx'

const client = new ApolloClient({
  uri: 'http://localhost:3000'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <h1>arteMetrics under construction...</h1> */}
    <MainContainer />
      </div>
    </ApolloProvider>
  );
}

export default App;
