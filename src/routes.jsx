import React from 'react';
import { Route } from 'react-router';
import App from './_app/App';
import DefaultPage from './components/default/';
import EditableItemPage from './components/editableItem/';

export default (
  <Route component={App}>
    <Route path="/" component={DefaultPage} />
    <Route path="item/:id" component={EditableItemPage} />
  </Route>
);
