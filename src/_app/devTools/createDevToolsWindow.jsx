import React from 'react';
import { render } from 'react-dom';
import DevTools from './DevTools';

export default function showDevTools(store) {
  const popup = window.open(null, 'Redux DevTools', 'menubar=no,location=no,resizable=yes,scrollbars=no,status=no');
  // Reload in case it already exists
  // If you are inspecting this code because it is throwing errors in the console
  // be sure to have your pop-up blocker disabled for localhost:3002.
  popup.location.reload();

  setTimeout(() => {
    popup.document.write('<div id="react-devtools-root"></div>');
    render(
      <DevTools store={store} />,
      popup.document.getElementById('react-devtools-root')
    );
  }, 10);
}
