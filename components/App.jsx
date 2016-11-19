import React from 'react';
import { ReduxAsyncConnect } from 'redux-connect';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import Page from './Page';
import Content from './Content';


export default class App extends React.Component {
  render() {
    return (
      <Router render={props => <ReduxAsyncConnect {...props} />} history={browserHistory}>
        <Route path="/" component={Page}>
          <IndexRedirect to="widgets" />
          <Route path=":pageSlug" component={Content} />
        </Route>
      </Router>
    );
  }
}
