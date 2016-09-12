/* global __DEVTOOLS__ */

import { handleActions } from 'redux-actions';
import { MODULE_INITIALIZED } from '../constants/actionConstants';

const initialState = {
  schemaTest: [],
};

const reducers = handleActions({
  [MODULE_INITIALIZED]: (state) => ({ ...state, test: true }),
}, initialState);

export default reducers;
