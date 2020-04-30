
import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { authReducer } from './auth';

const store = createStore(
  combineReducers(
    {
      auth: authReducer
    }
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline/>
      <App/>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));

serviceWorker.unregister();
