import 'babel-polyfill';

import './reset.scss';
import './styles.scss';

import ReactDOM from 'react-dom';
import React, { Component, Fragment } from 'react';
import { Query, Builder, Preview } from 'react-query-builder';
import config from './config';

const App = () => (
  <Query config={config}>
    {(config, state, actions) => (
      <Fragment>
        <Preview config={config} tree={state}>
          {query => (
            <code className="query-preview">
              {query || 'Use the builder below to create a search query.'}
            </code>
          )}
        </Preview>
        <div className="query-builder">
          <Builder config={config} tree={state} actions={actions} />
        </div>
      </Fragment>
    )}
  </Query>
);

ReactDOM.render(<App />, document.getElementById('app'));
