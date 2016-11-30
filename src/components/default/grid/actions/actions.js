/* global _ */

import { selectItemAction } from './selectItemAction';
import { selectItemRangeAction } from './selectItemRangeAction';
import { selectAllAction } from './selectAllAction';
import { changeSort } from './changeSortAction';
import { deleteItems } from './deleteItemsAction';

export { selectAllAction as toggleSelectAllItems, deleteItems, changeSort };

export function itemSelected(itemId, deselectAll, rowIndex, pressedKey) {
  return (dispatch, getState) => {
    const state = getState().changeThisName;
    if (pressedKey !== 'shiftKey' || state.tableSelection.latestIdSelected === '') {
      return dispatch(selectItemAction(itemId, deselectAll, pressedKey));
    }

    const indexItem = _.findIndex(state.tableData, { id: state.tableSelection.latestIdSelected });
    const minIndex = rowIndex < indexItem ? rowIndex : indexItem;
    const maxIndex = rowIndex >= indexItem ? rowIndex : indexItem;
    return dispatch(selectItemRangeAction(minIndex, maxIndex));
  };
}
