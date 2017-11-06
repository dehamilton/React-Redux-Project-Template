/* eslint-disable */
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

export function deleteItems() {
  return (dispatch) => {
    // TODO replace with real logic
    dispatch(deleteItemsAction());
  };
}

export const createGridActions = (prefix) => {
  const PREFIX = prefix;

  const changeSortAction = createAction(COLUMN_SORT_CHANGED, sorting => sorting);

  function selectItem(itemId, deselectAll, pressedKey) {
    return {
      type: SELECT_ITEM,
      itemId,
      deselectAll,
      pressedKey,
    };
  }

  function selectItemsRange(minIndex, maxIndex) {
    return {
      type: SELECT_ITEM_RANGE,
      minIndex,
      maxIndex,
    };
  }

  function itemSelected(itemId, deselectAll, rowIndex, pressedKey) {
    return (dispatch, getState) => {
      const state = getState()[PREFIX];
      if (pressedKey !== 'shiftKey' || state.getIn(['tableSelection', 'latestIdSelected']) === '') {
        return dispatch(selectItem(itemId, deselectAll, pressedKey));
      }

      const indexItem = _.findIndex(
        state.get('tableData').toJS(),
        { id: state.getIn(['tableSelection', 'latestIdSelected']) }
      );

      const minIndex = rowIndex < indexItem ? rowIndex : indexItem;
      const maxIndex = rowIndex >= indexItem ? rowIndex : indexItem;
      return dispatch(selectItemsRange(minIndex, maxIndex));
    };
  }

  function toggleSelectAllItems() {
    return {
      type: TOGGLE_SELECT_ALL_ITEMS,
    };
  };

  function changeSort(columnKey, direction) {
    return (dispatch, getState) => {
      const newDirection = getState()[PREFIX]
        .getIn(['tableSorting', 'by']) === columnKey ? toggleSortingDirection(direction) : 'ASC';
      return dispatch(changeSortAction({ by: columnKey, direction: newDirection }));
    };
  };

  function toggleSortingDirection(direction) {
    return direction === 'ASC' ? 'DESC' : 'ASC';
  };

  return {
    itemSelected,
    changeSort,
    toggleSelectAllItems,
  };
}
