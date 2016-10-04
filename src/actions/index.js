import { createAction } from 'redux-actions';
import * as actionConstants from 'constants/actionConstants';

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

// For testing basic grid functionality
export function loadData() {
  return {
    type: actionConstants.MODULE_LOAD_DATA,
    data: [
      { id: '1', name: 'Test Row 1', lastEditedUtc: '2016-09-12T18:25:30.907', __selected: false },
      { id: '2', name: 'Test Row 2', lastEditedUtc: '2016-09-13T18:25:30.907', __selected: false },
      { id: '3', name: 'Test Row 3', lastEditedUtc: '2016-09-14T18:25:30.907', __selected: false },
      { id: '4', name: 'Test Row 4', lastEditedUtc: '2016-09-15T18:25:30.907', __selected: false },
      { id: '5', name: 'Test Row 5', lastEditedUtc: '2016-09-16T18:25:30.907', __selected: false },
    ],
  };
}
