
import * as serviceWorker from './serviceWorker';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline/>
    <App/>
  </BrowserRouter>
, document.getElementById('root'));

serviceWorker.unregister();
