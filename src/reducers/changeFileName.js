import { handleActions } from 'redux-actions';
import { handleActionsExt } from '_utils/handleActionsExt';
import immutable from 'immutable';
import { GlobalActions } from 'actions/export';
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
  ...handleActionsExt(GlobalActions),
  ...gridReducers,
  ...filterReducers,
  ...tableStatsReducers,
}, initialState);

export default changeThisName;
