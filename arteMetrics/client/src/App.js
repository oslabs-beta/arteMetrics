import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './styles/styles.css';

import Particles from 'react-particles-js';
import TopNavBar from './components/TopNavBar.jsx';
import MainContainer from './components/containers/MainContainer.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import CreateAccount from './components/CreateAccount.jsx';
import CreateAppContainer from './components/containers/CreateAppContainer';
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

  componentWillMount() {
    // console.log('insidemount state: ', this.state);
    if (Cookies.get('token')) {
      // this.verifyjwt();
    }
  }

  componentDidMount() {}

  componentWillUnmount() {
    // if (this.vantaEffect) {
    //   this.vantaEffect.destroy();
    // }
  }

  componentDidUpdate() {}

  async verifyjwt() {
    const jwt = await Cookies.get('token');

    console.log('this is jwt: ', jwt);

    await fetch('testjwt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: jwt })
    })
      .then((data) => data.json())
      .then((myJson) => {
        const state = { ...this.state };
        state.loggedin = true;
        state.username = myJson.user;
        this.setState(state);
      })
      .catch((err) => console.log(err));
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
            {/* <Route path="/metrics" component={MainContainer} /> */}
            <Route
              path="/metrics"
              render={() => (
                <MainContainer
                  loggedin={this.state.loggedin}
                  verifyjwt={this.verifyjwt}
                />
              )}
            />
            <Route
              path="/login"
              render={() => <Login verifyjwt={this.verifyjwt} />}
            />
            <Route
              path="/createaccount"
              render={() => <CreateAccount verifyjwt={this.verifyjwt} />}
            />
            <Route path="/createapp" render={() => <CreateAppContainer />} />
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
