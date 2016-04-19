import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { POSTAL_RECEIVE_MESSAGE } from './postal';
// import { getApiCall } from '../apis/index';

function* incrementAsync(getState) {
  // const data = yield call(getApiCall, getState().files);
  yield put({ type: 'INCREMENT', data: {} });
}

export function* watchPostalReceiveMessage(getState) {
  yield* takeEvery(POSTAL_RECEIVE_MESSAGE, incrementAsync, getState);
}
