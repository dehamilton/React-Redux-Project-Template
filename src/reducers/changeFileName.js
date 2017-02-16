/* global __DEVTOOLS__ */

import { handleActions } from 'redux-actions';
import immutable from 'immutable';
import { MODULE_INITIALIZED, MODULE_LOAD_DATA, MODULE_LOAD_DATA_MORE } from 'constants/actionConstants';
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
  tableFilters: { minlastEditedUtc: '', maxlastEditedUtc: '', name: '' },
});

const changeThisName = handleActions({
  ...gridReducers,
  ...filterReducers,
  ...tableStatsReducers,
  [MODULE_INITIALIZED]: state => (state),
  [MODULE_LOAD_DATA]: (state, action) => (state.merge({ tableData: action.data, tableDataOriginal: action.data })),
  [MODULE_LOAD_DATA_MORE]: (state, action) => {
    const data = state.get('tableData').toJS();
    const newData = data.concat(action.data);
    return state.merge({ tableData: newData, tableDataOriginal: newData });
  },
}, initialState);

export default changeThisName;
