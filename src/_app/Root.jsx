/* global __DEVTOOLS__ */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configureStore from './store/configureStore';
import routes from '../routes';

const store = configureStore();

if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  // eslint-disable-next-line global-require
  const createDevToolsWindow = require('./devTools/createDevToolsWindow').default;

  createDevToolsWindow(store);
}


export default class Root extends Component {
  static propTypes = {
    history: PropTypes.any.isRequired,
  };

  render() {
    return (
      <Provider store={store} key="provider">
        <Router history={this.props.history}>
          {routes}
        </Router>
      </Provider>
    );
  }
}
