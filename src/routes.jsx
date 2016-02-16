import React from 'react';
import { Route } from 'react-router';
import App from './containers/app/App';
import * as containers from './containers';

const {
  ContainerPage,
} = containers;


export default (
  <Route component={App}>
    <Route path="/" component={ContainerPage} />
  </Route>
);
