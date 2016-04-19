/* global __DEVTOOLS__ */

import { MODULE_INITIALIZED } from '../constants/actionConstants';
import { handleActions } from 'redux-actions';

let initialState = {};

const reducers = handleActions({
  [MODULE_INITIALIZED]: (state, action) => {
    return { ...state };
  },
}, initialState);

export default reducers;
