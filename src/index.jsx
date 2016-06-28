import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/app/Root';
import createMemoryHistory from 'history/lib/createMemoryHistory';

require('./utils/axios');

const history = createMemoryHistory();

ReactDOM.render(
  <Root history={history} />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
