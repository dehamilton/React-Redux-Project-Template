import {
  FILTER_GRID,
} from 'constants/actionConstants';

// eslint-disable-next-line import/prefer-default-export
export function filterGrid(target, filterType, value) {
  return {
    type: FILTER_GRID,
    target,
    filterType,
    value,
  };
}
