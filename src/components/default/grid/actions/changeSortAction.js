/* eslint-disable import/prefer-default-export */
import { sortBy } from './gridUtils';

const changeSortAction = {
  type: 'COLUMN_SORT_CHANGED',
  get action() {
    return sorting => (
      {
        type: this.type,
        sorting,
      }
    );
  },
  get creator() {
    return (columnKey, direction) => (
      (dispatch, getState) => {
        const newDirection = getState().reducers.tableSorting.by === columnKey
          ? this.toggleSortingDirection(direction)
          : 'ASC';
        return dispatch(this.action({ by: columnKey, direction: newDirection }));
      }
    );
  },
  toggleSortingDirection(direction) {
    return direction === 'ASC' ? 'DESC' : 'ASC';
  },
  get register() {
    return {
      [this.type]: (state, action) => this.changeSorting(state, action.sorting.by, action.sorting.direction),
    };
  },
  changeSorting(state, by, direction) {
    return { ...state,
      tableSorting: { by, direction },
      tableData: sortBy(state.tableData, by, direction),
    };
  },
};

const action = changeSortAction.action;
const creator = changeSortAction.creator;
const register = changeSortAction.register;
export { action as changeSortAction, creator as changeSort, register };
