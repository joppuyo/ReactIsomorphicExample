import express from 'express';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { ReduxAsyncConnect, loadOnServer, reducer as reduxAsyncConnect } from 'redux-connect';
import nunjucks from 'nunjucks';
import Helmet from 'react-helmet';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import serialize from 'serialize-javascript';
import routes from './components/Routes';

const app = express();

app.use('/public', express.static('public'));

app.get('/api/pages/:pageId', (request, response) => {
  fs.readFile('fixtures/' + request.params.pageId + '.json', 'utf-8', (error, json) => {
    if (error) {
      response.status(404).send('Not Found');
    } else {
      response.type('json');
      response.send(json);
    }
  });
});

app.get('/\*', (req, res) => {
  const store = createStore(combineReducers({ reduxAsyncConnect }));
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      loadOnServer({ ...renderProps, store }).then(() => {
        let error = store.getState().reduxAsyncConnect.loadState.content.error;
        if (error && error.response && error.response.status === 500) {
          res.status(500).send('Internal Server Error');
        } else if (error && error.response && error.response.status === 404) {
          res.status(404).send('Not found');
        } else {
          const appHTML = renderToString(
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          );
          const head = Helmet.rewind();

          nunjucks.configure({ autoescape: false });

          const html = nunjucks.render('index.nunjucks',
            {
              html: appHTML,
              htmlAttributes: head.htmlAttributes.toString(),
              title: head.title.toString(),
              meta: head.meta.toString(),
              data: serialize(store.getState()),
            });
          res.send(html);
        }
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

app.listen(3000);
