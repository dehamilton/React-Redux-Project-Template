/* global _ */

import { createAction } from 'redux-actions';
import {
  SELECT_ITEM,
  SELECT_ITEM_RANGE,
  TOGGLE_SELECT_ALL_ITEMS,
  COLUMN_SORT_CHANGED,
  ITEMS_DELETED,
} from 'constants/actionConstants';

export const deleteItemsAction = createAction(ITEMS_DELETED);
export const changeSortAction = createAction(COLUMN_SORT_CHANGED, sorting => sorting);

export function deleteItems() {
  return (dispatch) => {
    // TODO replace with real logic
    dispatch(deleteItemsAction());
  };
}

export function selectItem(itemId, deselectAll, pressedKey) {
  return {
    type: SELECT_ITEM,
    itemId,
    deselectAll,
    pressedKey,
  };
}

export function selectItemsRange(minIndex, maxIndex) {
  return {
    type: SELECT_ITEM_RANGE,
    minIndex,
    maxIndex,
  };
}

export function itemSelected(itemId, deselectAll, rowIndex, pressedKey) {
  return (dispatch, getState) => {
    const state = getState().changeThisName;
    if (pressedKey !== 'shiftKey' || state.tableSelection.latestIdSelected === '') {
      return dispatch(selectItem(itemId, deselectAll, pressedKey));
    }

    const indexItem = _.findIndex(state.tableData, { id: state.tableSelection.latestIdSelected });
    const minIndex = rowIndex < indexItem ? rowIndex : indexItem;
    const maxIndex = rowIndex >= indexItem ? rowIndex : indexItem;
    return dispatch(selectItemsRange(minIndex, maxIndex));
  };
}

export function toggleSelectAllItems() {
  return {
    type: TOGGLE_SELECT_ALL_ITEMS,
  };
}

export function changeSort(columnKey, direction) {
  return (dispatch, getState) => {
    const newDirection = getState().changeThisName.tableSorting.by === columnKey
                          ? toggleSortingDirection(direction) : 'ASC';
    return dispatch(changeSortAction({ by: columnKey, direction: newDirection }));
  };
}

function toggleSortingDirection(direction) {
  return direction === 'ASC' ? 'DESC' : 'ASC';
}
