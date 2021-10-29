import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID } = process.env;

ReactDOM.render(
  <Auth0Provider
  domain={REACT_APP_AUTH0_DOMAIN}
  clientId={REACT_APP_AUTH0_CLIENT_ID}
  redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

reportWebVitals();
