import { createAction } from 'redux-actions';
import { UPDATE_TABLE_STATS } from 'constants/actionConstants';

// eslint-disable-next-line
export const computeStats = createAction(UPDATE_TABLE_STATS);
