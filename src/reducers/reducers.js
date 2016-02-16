/* global __DEVTOOLS__ */

import { MODULE_INITIALIZED } from '../actions/actionConstants';
import { handleActions } from 'redux-actions';

let initialState = {};

const reducers = handleActions({
  [MODULE_INITIALIZED]: {
    next(state, action) {
      return { ...state };
    },
  },
}, initialState);

export default reducers;