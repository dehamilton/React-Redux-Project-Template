import * as actionConstants from '../constants/actionConstants';
import { createAction } from 'redux-actions';

export const initModule = createAction(actionConstants.MODULE_INITIALIZED);

// Typecheck module lets us add typechecking ability to functions
// see: https://github.com/codemix/babel-plugin-typecheck
export function testTypecheck(arg: bool, arg2: string): Object {
  return {
    type: actionConstants.TEST_TYPECHECK,
    arg,
    arg2,
  };
}
