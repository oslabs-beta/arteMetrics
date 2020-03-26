import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './styles/styles.css';

import Particles from 'react-particles-js';
import TopNavBar from './components/TopNavBar.jsx';
import MainContainer from './components/containers/MainContainer.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import CreateAccount from './components/CreateAccount.jsx';
import Query from './components/Query.jsx';
import QueriesOverview from './components/QueriesOverview.jsx';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      username: false
    };
    this.verifyjwt = this.verifyjwt.bind(this);
  }

  componentDidMount() {
    if (Cookies.get('token')) {
      this.verifyjwt();
    }
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  async verifyjwt() {
    const jwt = await Cookies.get('token');

    console.log('this is jwt: ', jwt);

    await fetch('testjwt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: jwt })
    })
      .then(data => data.json())
      .then(myJson => {
        const state = { ...this.state };
        state.loggedin = true;
        state.username = myJson.user;
        this.setState(state);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <TopNavBar
            loggedin={this.state.loggedin}
            username={this.state.username}
          />
          <Router>
            <Route path="/" exact component={Home} />
            {/* <Route path="/home" component={Home} /> */}
            <Route path="/metrics" component={MainContainer} />
            <Route
              path="/login"
              render={() => <Login verifyjwt={this.verifyjwt} />}
            />
            <Route
              path="/createaccount"
              render={() => <CreateAccount verifyjwt={this.verifyjwt} />}
            />
            <Route path="/queriesoverview" component={QueriesOverview} />
            <Route path="/query" component={Query} />
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
      </ApolloProvider>
    );
  }
}

export default App;
