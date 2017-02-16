import {
  FILTER_GRID,
  FILTER_GRID_CLEAR,
} from 'constants/actionConstants';

export function filterGrid(target, value, filterType) {
  return {
    type: FILTER_GRID,
    target,
    filterType,
    value,
  };
}

export function filterClear() {
  return {
    type: FILTER_GRID_CLEAR,
  };
}
