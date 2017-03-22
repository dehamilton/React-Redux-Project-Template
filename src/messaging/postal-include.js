// Create saga that will listen for POSTAL_RECEIVE_MESSAGE action.
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { watchPostalReceiveMessage } from './sagas';
import reduxPostal from './postal-middleware';

const sagaMiddleware = createSagaMiddleware();

function createPostalMiddleware(options = {}) {
  const postalMiddleware = reduxPostal(options);
  return { postalMiddleware, sagaMiddleware };
}

export function* rootSaga() {
  yield [
    fork(watchPostalReceiveMessage),
  ];
}

export default createPostalMiddleware;
