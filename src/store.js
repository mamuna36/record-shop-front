
import { createStore, combineReducers } from 'redux';
import { authReducer, authSideEffects } from './auth';

const store = createStore(
  combineReducers(
    {
      auth: authReducer
    }
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe( authSideEffects(store) );

export default store;
