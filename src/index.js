import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './Redux-Store/Store';
import { Provider } from 'react-redux';
/*
  React Bootstrap configuration
*/

import '../node_modules/react-bootstrap/dist/react-bootstrap';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

//react-bootstrap icons:-

<link
  rel='stylesheet'
  href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css'></link>;

//Roboto-icon

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </>
);
