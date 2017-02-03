/* eslint-disable no-extra-boolean-cast */
/* global _ */

import * as actionConstants from 'constants/actionConstants';
import { sortBy, computeTableStats } from './gridUtils';

function selectItem(state, action) {
  let allItems;
  let selectedItems = [];
  const anItem = _.find(state.get('tableData'), { id: action.itemId });
  const isSelected = anItem.__selected;

  if (action.deselectAll === true) {
    selectedItems = state.get('tableData').filter(i => i.__selected);
    const forceSelected = state.get('tableSelection').latestSelectionType !== '' && selectedItems.length > 1;
    allItems = state.get('tableData').map((item) => { delete item.__selected; return item; });
    anItem.__selected = forceSelected ? true : !!!isSelected;
  } else {
    anItem.__selected = !!!anItem.__selected;
    allItems = state.get('tableData');
  }

  let latestIdSelected;
  if (action.pressedKey !== 'shiftKey' || state.get('tableSelection').latestIdSelected === '') {
    latestIdSelected = anItem.__selected ? anItem.id : '';
  } else {
    latestIdSelected = state.get('tableSelection').latestIdSelected;
  }
  const latestSelectionType = action.pressedKey !== '' ? 'multiple' : '';
  const stats = computeTableStats(allItems);

  return state.set('tableData', allItems)
          .set('tableStats', stats)
          .set('tableSelection', { latestSelectionType, latestIdSelected });
}

function toggleAllSelection(state) {
  const data = state.get('tableData');
  const currentCounters = computeTableStats(data);
  const noneSelected = currentCounters.selected === 0;
  const checkValue = noneSelected || currentCounters.someButNotAllSelected;

  _.forEach(data, (p) => {
    p.__selected = checkValue;
  });

  const tableStats = computeTableStats(data);

  const selection = state.get('tableSelection');
  selection.latestIdSelected = data.length > 0 && data.allSelected ? data[0].id : '';
  selection.latestSelectionType = 'multiple';

  return state.set('tableData', data)
          .set('tableStats', tableStats)
          .set('tableSelection', selection);
}

function changeSorting(state, by, direction) {
  return state.set('tableData', sortBy(state.get('tableData'), by, direction))
          .set('tableSorting', { by, direction });
}

function selectRange(state, action) {
  const items = state.get('tableData').map((item, index) => {
    delete item.__selected;
    if (index >= action.minIndex && index <= action.maxIndex) {
      item.__selected = true;
    }
    return item;
  });

  const stats = computeTableStats(items);
  const selection = state.get('tableSelection');
  selection.latestSelectionType = 'range';

  return state.set('tableData', items)
          .set('tableStats', stats)
          .set('tableSelection', selection);
}

function handleItemsHasBeenRemoved(state) {
  return state;
}

const gridReducers = {
  [actionConstants.SELECT_ITEM]: (state, action) => selectItem(state, action),
  [actionConstants.SELECT_ITEM_RANGE]: (state, action) => selectRange(state, action),
  [actionConstants.TOGGLE_SELECT_ALL_ITEMS]: state => toggleAllSelection(state),
  [actionConstants.COLUMN_SORT_CHANGED]: (state, action) =>
        changeSorting(state, action.payload.by, action.payload.direction),
  [actionConstants.ITEMS_DELETED]: state => handleItemsHasBeenRemoved(state),
};

export default gridReducers;
