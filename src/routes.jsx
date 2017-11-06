import React from 'react';
import { Route } from 'react-router-dom';
import DefaultPage from './components/default/';
import EditableItemPage from './components/editableItem/';

export default (
  <div>
    <Route exact path="/" component={DefaultPage} />
    <Route path="/item/:id" component={EditableItemPage} />
  </div>
);
