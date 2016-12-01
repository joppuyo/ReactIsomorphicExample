import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import App from './components/App';

const store = createStore(combineReducers({ reduxAsyncConnect }), window.__data);

ReactDOM.render(
  <Provider store={store} key="provider">
    <App />
  </Provider>, document.getElementById('content'),
);
