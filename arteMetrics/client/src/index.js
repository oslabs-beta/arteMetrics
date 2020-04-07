import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import logo from './assets/arte_lavender_yellow.png';

// const render = () => {
ReactDOM.render(
  // <AppContainer>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // </AppContainer>,
  document.getElementById('root')
);
// };

// render();

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     render();
//   });
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
