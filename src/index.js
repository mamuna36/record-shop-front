
import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';

import { Provider } from 'react-redux';
import store from './store.js';
import { CheckAuth } from './auth';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <CheckAuth/>
      <CssBaseline/>
      <App/>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));

serviceWorker.unregister();
