/* global _ */

import {
  FILTER_GRID,
} from 'constants/actionConstants';
import moment from 'moment';

function filterTableData(state, action) {
  if (action.value.trim() === '') {
    return { ...state, tableData: state.tableDataOriginal };
  }

  let data = state.tableData;
  if (action.filterType === 'string') {
    data = state.tableData.filter(f => f[action.target].toLowerCase().indexOf(action.value.toLowerCase()) > -1);
  } else if (action.filterType === 'date') {
    // would need to have a complete date, not partial, for true date filtering
    data = state.tableData.filter((f) => {
      const formattedDate = moment(f[action.target]).format('MM/DD/YYYY');
      return formattedDate.indexOf(action.value.toLowerCase()) > -1;
    });
  }

  return { ...state, tableData: data };
}

const filterReducers = {
  [FILTER_GRID]: (state, action) => filterTableData(state, action),
};

export default filterReducers;
