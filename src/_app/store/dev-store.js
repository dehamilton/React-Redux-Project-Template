/* eslint object-shorthand: 0, import/first: 0 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger';
import rootReducer from 'reducers';

// Messaging setup
import { CHANNEL, TOPIC } from 'constants/messageConstants';
import createPostalMiddleware, { rootSaga } from 'messaging/postal-include';

const { postalMiddleware, sagaMiddleware } = createPostalMiddleware(
  { channel: CHANNEL, topic: `${TOPIC}.*` }
);

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

/* eslint-disable import/imports-first */
import { applicationStateSchema } from 'reducers/state-schema';
import createValidator from 'redux-state-validator';
/* eslint-enable import/imports-first */
const validatorMiddleware = createValidator({ schema: applicationStateSchema, state: ['changeReducerName'] });

// small middleware to set window variable with result of state for debugging
const setWindowState = store => next => (action) => {
  const result = next(action);

  if (!window.stateObject) window.stateObject = {};
  window.stateObject = Object.assign({}, window.stateObject, store.getState());

  return result;
};

const DevTools = require('../devTools/DevTools').default;
const { persistState } = require('redux-devtools');

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunkMiddleware,
    promiseMiddleware,
    setWindowState,
    postalMiddleware,
    sagaMiddleware,
    validatorMiddleware,
    loggerMiddleware),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

/**
 * Creates a preconfigured store.
 */
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../../reducers', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../../reducers/index').default);
    });
  }

  return store;
}
