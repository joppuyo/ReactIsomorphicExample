import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import axios from 'axios';

import { ReduxAsyncConnect, asyncConnect, reducer as reduxAsyncConnect } from 'redux-connect'

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

class App extends React.Component {
    render() {
        return (
            <Router render={(props) => <ReduxAsyncConnect {...props}/>} history={browserHistory}>
                <Route path="/" component={Page}>
                    <IndexRedirect to="widgets" />
                    <Route path=":pageSlug" component={Content}/>
                </Route>
            </Router>
        );
    }
}

class Page extends React.Component {
    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="widgets">Widgets</Link>
                        </li>
                        <li>
                            <Link to="gadgets">Gadgets</Link>
                        </li>
                        <li>
                            <Link to="gizmos">Gizmos</Link>
                        </li>
                    </ul>
                </nav>
                {this.props.children}
            </div>
        );
    }
}

@asyncConnect([{
    key: 'content',
    promise: ({ params, helpers }) => {
        return axios.request(`/api/pages/${params.pageSlug}`).then((response) => {
            console.log(response);
            return response.data;
        });
    }
}])
class Content extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.content.title}</h1>
                <p>{this.props.content.body}</p>
            </div>
        )
    }
}

const store = createStore(combineReducers({ reduxAsyncConnect }), window.__data);

ReactDOM.render(
    <Provider store={store} key="provider">
        <App />
    </Provider>, document.getElementById('content')
);
