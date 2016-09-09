import reduxPostal from 'redux-postal-middleware';

// Create saga that will listen for POSTAL_RECEIVE_MESSAGE action.
import createSagaMiddleware from 'redux-saga';
import { watchPostalReceiveMessage } from './sagas';

const sagaMiddleware = createSagaMiddleware(watchPostalReceiveMessage);

function createPostalMiddleware(options = {}) {
  const postalMiddleware = reduxPostal(options);
  return { postalMiddleware, sagaMiddleware };
}

export default createPostalMiddleware;
