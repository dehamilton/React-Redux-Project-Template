/* global __DEVTOOLS__ */

import { MODULE_INITIALIZED } from '../constants/actionConstants';
import { handleActions } from 'redux-actions';

const initialState = {
  schemaTest: [],
};

const reducers = handleActions({
  [MODULE_INITIALIZED]: (state) => Object.assign({}, state),
}, initialState);

export default reducers;
