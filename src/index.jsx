import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/app/Root';
import createMemoryHistory from 'history/lib/createMemoryHistory';

//IE...
require('babel-polyfill');

require('./utils/axios');

const history = createMemoryHistory();

ReactDOM.render(
  <Root history={history} />,
  document.getElementById('root')
);

