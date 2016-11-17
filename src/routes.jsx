import React from 'react';
import { Route } from 'react-router';
import App from './_app/App';
import ContainerPage from './components/default/_route/ContainerPage';

export default (
  <Route component={App}>
    <Route path="/" component={ContainerPage} />
  </Route>
);
