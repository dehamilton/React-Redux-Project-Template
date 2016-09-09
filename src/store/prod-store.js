/* eslint object-shorthand: 0 */
/* global __DEVTOOLS__ */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import rootReducer from '../reducers';

// Messaging setup
import { CHANNEL, TOPIC } from '../constants/messageConstants';
import createPostalMiddleware from '../messaging/postal-include';

const { postalMiddleware, sagaMiddleware } = createPostalMiddleware(
  { channel: CHANNEL, topic: `${TOPIC}.*` }
);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware,
  postalMiddleware,
  sagaMiddleware
)(createStore);

/**
 * Creates a preconfigured store.
 */
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}
