import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/app/Root';
import createMemoryHistory from 'history/lib/createMemoryHistory';

// IE...
require('es6-promise').polyfill();

require('./utils/axios');

const history = createMemoryHistory();

ReactDOM.render(
  <Root history={history} />,
  document.getElementById('root')
);

