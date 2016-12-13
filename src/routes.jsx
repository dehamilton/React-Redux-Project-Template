import React from 'react';
import { Route } from 'react-router';
import App from './_app/App';
import DefaultPage from './components/default/_route/DefaultPage';
import EditableItemPage from './components/editableItem/_route/EditableItemPage';
import InputSamplesPage from './components/inputSamples/_route/InputSamplesPage';

export default (
  <Route component={App}>
    <Route path="/" component={DefaultPage} />
    <Route path="item/:id" component={EditableItemPage} />
    <Route path="/inputs" component={InputSamplesPage} />
  </Route>
);
