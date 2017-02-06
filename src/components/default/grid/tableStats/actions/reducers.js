import * as actionConstants from 'constants/actionConstants';
import { computeTableStats } from '../../actions/gridUtils';

function updateTableStats(state) {
  const stats = computeTableStats(state.get('tableData').toJS());
  return state.merge({ tableStats: stats });
}

const tableStatsReducers = {
  [actionConstants.UPDATE_TABLE_STATS]: state => updateTableStats(state),
};

export default tableStatsReducers;
