import React from 'react';
import { ReduxAsyncConnect } from 'redux-connect';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import Routes from './Routes';


export default class App extends React.Component {
  render() {
    return (
      <Router render={props => <ReduxAsyncConnect {...props} />} history={browserHistory} routes={Routes}>
      </Router>
    );
  }
}
