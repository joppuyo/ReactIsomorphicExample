import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './components/App.jsx';

import { reducer as reduxAsyncConnect } from 'redux-connect'

/*
let counter = (state = {}, action) => {
    if (action.type === 'GET_DATA') {
        return {
            "slug": "widgets",
            "title": "Widgets",
            "description": "Leverage agile frameworks to provide a robust synopsis for high level overviews.",
            "body": "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."
        }
    }
    return state;
};

let store = createStore(counter);


store.subscribe(() =>
    console.log(store.getState())
);
*/

const store = createStore(combineReducers({ reduxAsyncConnect }), window.__data);

ReactDOM.render(
    <Provider store={store} key="provider">
        <App />
    </Provider>, document.getElementById('content')
);
