import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { POSTAL_RECEIVE_MESSAGE } from './postal-middleware';

// example only.
function* incrementAsync() {
  yield put({ type: 'INCREMENT', data: {} });
}

// eslint-disable-next-line import/prefer-default-export
export function* watchPostalReceiveMessage(getState) {
  yield* takeEvery(POSTAL_RECEIVE_MESSAGE, incrementAsync, getState);
}
