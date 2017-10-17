import React from 'react';
import ReactDOM from 'react-dom';
import Root from './_app/Root';

require('./_utils/axios');

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
