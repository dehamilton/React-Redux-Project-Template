/* global __DEVTOOLS__ */

import { handleActions } from 'redux-actions';
import filterReducers from 'components/default/grid/filter/actions/reducers';
import { handleActionsExt } from '_utils/handleActionsExt';
import { TestActions } from 'actions/export';
import { modules } from './modules';

const initialState = {
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
};

const changeThisName = handleActions({
  ...handleActionsExt(TestActions),
  ...filterReducers,
  ...modules,
}, initialState);

export default changeThisName;
