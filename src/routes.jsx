import React from 'react';
import { Route } from 'react-router';
import App from './_app/App';
import DefaultPage from './components/default/index';

export default (
  <Route component={App}>
    <Route path="/" component={DefaultPage} />
  </Route>
);
