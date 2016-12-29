import * as actionConstants from 'constants/actionConstants';
import { computeTableStats } from '../../actions/gridUtils';

function updateTableStats(state) {
  state.tableStats = computeTableStats(state.tableData);
  return { ...state };
}

const tableStatsReducers = {
  [actionConstants.UPDATE_TABLE_STATS]: state => updateTableStats(state),
};

export default tableStatsReducers;
