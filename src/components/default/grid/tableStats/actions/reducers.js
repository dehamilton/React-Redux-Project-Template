import * as actionConstants from 'constants/actionConstants';
import { computeTableStats } from '../../actions/gridUtils';

function updateTableStats(state) {
  const stats = computeTableStats(state.get('tableData'));
  return state.set('tableStats', stats);
}

const tableStatsReducers = {
  [actionConstants.UPDATE_TABLE_STATS]: state => updateTableStats(state),
};

export default tableStatsReducers;
