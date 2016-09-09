import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { POSTAL_RECEIVE_MESSAGE } from 'redux-postal-middleware';
// import { getApiCall } from '../apis/index';

function* incrementAsync() {
  // const data = yield call(getApiCall, getState().files);
  yield put({ type: 'INCREMENT', data: {} });
}

// eslint-disable-next-line import/prefer-default-export
export function* watchPostalReceiveMessage(getState) {
  yield* takeEvery(POSTAL_RECEIVE_MESSAGE, incrementAsync, getState);
}
