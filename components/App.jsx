import React from 'react';
import { ReduxAsyncConnect } from 'redux-connect'
import Page from './Page.jsx';
import Content from './Content.jsx';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router';

export default class App extends React.Component {
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
