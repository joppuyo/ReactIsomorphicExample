import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import React from 'react';
import Page from './Page';
import Content from './Content';

export default (
  <Route path="/" component={Page}>
    <IndexRedirect to="widgets" />
    <Route path=":pageSlug" component={Content} />
  </Route>
);
