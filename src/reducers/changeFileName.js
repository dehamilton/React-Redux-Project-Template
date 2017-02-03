/* global __DEVTOOLS__ */

import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import { MODULE_INITIALIZED, MODULE_LOAD_DATA } from 'constants/actionConstants';
import filterReducers from 'components/default/grid/filter/actions/reducers';
import tableStatsReducers from 'components/default/grid/tableStats/actions/reducers';
import gridReducers from 'components/default/grid/actions/reducers';

const initialState = immutable.fromJS({
  isLoading: false,
  schemaTest: [],
  tableData: [],
  tableDataOriginal: [],
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
});

const changeThisName = handleActions({
  ...gridReducers,
  ...filterReducers,
  ...tableStatsReducers,
  [MODULE_INITIALIZED]: state => (state),
  [MODULE_LOAD_DATA]: (state, action) => (state.set('tableData', action.data).set('tableDataOriginal', action.data)),
}, initialState);

export default changeThisName;
