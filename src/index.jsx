import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import { useRouterHistory } from 'react-router';
import Root from './_app/Root';

require('./_utils/axios');

const appHistory = useRouterHistory(createMemoryHistory)();

ReactDOM.render(
  <Root history={appHistory} />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
