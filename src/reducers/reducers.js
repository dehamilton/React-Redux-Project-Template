/* global __DEVTOOLS__ */

import { MODULE_INITIALIZED } from '../constants/actionConstants';
import { handleActions } from 'redux-actions';

const initialState = {};

const reducers = handleActions({
  [MODULE_INITIALIZED]: (state) => Object.assign({}, state),
}, initialState);

export default reducers;
