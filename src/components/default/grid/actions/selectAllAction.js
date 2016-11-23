/* eslint-disable import/prefer-default-export */
/* global _ */
import { computeTableStats } from './gridUtils';

const selectAllAction = {
  type: 'TOGGLE_SELECT_ALL_ITEMS',
  get create() {
    return () => (
      {
        type: this.type,
      }
    );
  },
  get register() {
    return {
      [this.type]: state => this.toggleAllSelection(state),
    };
  },
  toggleAllSelection: (state) => {
    const data = state.tableData;
    const currentCounters = computeTableStats(data);
    const noneSelected = currentCounters.selected === 0;
    const checkValue = noneSelected || currentCounters.someButNotAllSelected;

    _.forEach(data, (p) => {
      p.__selected = checkValue;
    });

    state.tableStats = computeTableStats(data);

    state.tableSelection.latestIdSelected = state.tableData.length > 0 && state.tableStats.allSelected
      ? state.tableData[0].id : '';
    state.tableSelection.latestSelectionType = 'multiple';

    return { ...state };
  },
};

const action = selectAllAction.create;
const register = selectAllAction.register;
export { action as selectAllAction, register };
