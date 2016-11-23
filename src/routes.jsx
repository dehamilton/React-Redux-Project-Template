import React from 'react';
import { Route } from 'react-router';
import App from './_app/App';
import DefaultPage from './components/default/_route/DefaultPage';

export default (
  <Route component={App}>
    <Route path="/" component={DefaultPage} />
  </Route>
);
