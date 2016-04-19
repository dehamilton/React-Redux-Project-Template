import * as actionConstants from '../constants/actionConstants';
import { createAction } from 'redux-actions';

export const initModule = createAction(actionConstants.MODULE_INITIALIZED);
