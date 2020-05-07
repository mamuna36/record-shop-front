
import { createStore, combineReducers } from 'redux';
import { authReducer, authSideEffects } from './auth';
import { basketReducer }                from './basket';

const store = createStore(
  combineReducers(
    {
      auth:   authReducer,
      basket: basketReducer
    }
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe( authSideEffects(store) );

export default store;
