import {
  FILTER_GRID,
  FILTER_GRID_CLEAR,
} from 'constants/actionConstants';
import moment from 'moment';

// Not meant as complete filtering solution!
function filterTableData(state, action) {
  if (action.value.trim() === '') {
    return state.merge({
      tableData: state.get('tableDataOriginal'),
    }).setIn(['tableFilters', action.target], '');
  }

  let data = state.get('tableData');
  if (action.filterType === 'text') {
    data = state.get('tableData')
      .filter(f => f.get(action.target).toLowerCase().indexOf(action.value.toLowerCase()) > -1);
  } else if (action.filterType === 'date') {
    data = state.get('tableData').filter((f) => {
      if (action.target.indexOf('min') > -1) {
        return moment(f.get(action.target.replace('min', ''))).isSameOrAfter(moment(action.value));
      }

      return moment(f.get(action.target.replace('max', ''))).isSameOrBefore(moment(action.value));
    });
  }

  const filters = state.get('tableFilters').toJS();
  filters[action.target] = action.value.trim();

  return state.merge({ tableData: data, tableFilters: filters });
}

function clearFilters(state) {
  const filters = state.get('tableFilters').toJS();
  const clearedFilters = {};
  // eslint-disable-next-line no-return-assign
  Object.keys(filters).forEach(k => (clearedFilters[k] = ''));

  return state.merge({ tableData: state.get('tableDataOriginal'), tableFilters: clearedFilters });
}

const filterReducers = {
  [FILTER_GRID]: (state, action) => filterTableData(state, action),
  [FILTER_GRID_CLEAR]: state => clearFilters(state),
};

export default filterReducers;
