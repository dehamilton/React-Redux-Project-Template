/* global _ */

import {
  FILTER_GRID,
} from 'constants/actionConstants';
import moment from 'moment';

function filterTableData(state, action) {
  if (action.value.trim() === '') {
    return state.set('tableData', state.get('tableDataOriginal'));
  }

  let data = state.get('tableData');
  if (action.filterType === 'string') {
    data = state.get('tableData').filter(f => f[action.target].toLowerCase().indexOf(action.value.toLowerCase()) > -1);
  } else if (action.filterType === 'date') {
    // would need to have a complete date, not partial, for true date filtering
    data = state.get('tableData').filter((f) => {
      const formattedDate = moment(f[action.target]).format('MM/DD/YYYY');
      return formattedDate.indexOf(action.value.toLowerCase()) > -1;
    });
  }

  return state.set('tableData', data);
}

const filterReducers = {
  [FILTER_GRID]: (state, action) => filterTableData(state, action),
};

export default filterReducers;
