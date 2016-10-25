/* global __DEVTOOLS__ */

import { handleActions } from 'redux-actions';
import { MODULE_INITIALIZED, MODULE_LOAD_DATA } from 'constants/actionConstants';
import gridReducers from 'components/grid/reducers';

const initialState = {
  isLoading: false,
  schemaTest: [],
  tableData: [],
  tableStats: {
    selected: 0,
    total: 0,
    allSelected: false,
    someButNotAllSelected: false,
    anySelected: false,
  },
  tableSorting: {
    by: 'name',
    direction: 'ASC',
  },
  tableSelection: {
    latestIdSelected: '',
    latestSelectionType: '',
  },
};

const reducers = handleActions({
  ...gridReducers,
  [MODULE_INITIALIZED]: state => ({ ...state }),
  [MODULE_LOAD_DATA]: (state, action) => ({ ...state, tableData: action.data }),
}, initialState);

export default reducers;
