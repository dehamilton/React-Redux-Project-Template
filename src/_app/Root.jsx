/* global __DEVTOOLS__ */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import routes from '../routes';

const store = configureStore();

if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  // eslint-disable-next-line global-require
  const createDevToolsWindow = require('./devTools/createDevToolsWindow').default;

  createDevToolsWindow(store);
}

export default class Root extends Component {
  render() {
    return (
      <Provider store={store} key="provider">
        <HashRouter>
          {routes}
        </HashRouter>
      </Provider>
    );
  }
}
