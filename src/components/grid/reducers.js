/* eslint-disable no-extra-boolean-cast */
/* global _ */

import * as actionConstants from 'constants/actionConstants';
import { sortBy, computeTableStats } from './gridUtils';

function selectItem(state, action) {
  let allItems;
  let selectedItems = [];
  const anItem = _.find(state.tableData, { id: action.itemId });
  const isSelected = anItem.__selected;
  
  if (action.deselectAll === true) {
    selectedItems = state.tableData.filter(i => i.__selected);
    const forceSelected = state.latestSelectionType !== '' && selectedItems.length > 1;
    allItems = state.tableData.map((item) => { delete item.__selected; return item; });
    anItem.__selected = forceSelected ? true : !!!isSelected;
  } else {
    anItem.__selected = !!!anItem.__selected;
    allItems = state.tableData;
  }

  let latestIdSelected;
  if (action.pressedKey !== 'shiftKey' || state.tableSelection.latestIdSelected === '') {
    latestIdSelected = anItem.__selected ? anItem.id : '';
  } else {
    latestIdSelected = state.tableSelection.latestIdSelected;
  }
  const latestSelectionType = action.pressedKey !== '' ? 'multiple' : '';
  state.tableStats = computeTableStats(allItems);
  return { ...state, tableData: allItems, tableSelection: { latestSelectionType, latestIdSelected } };
}

function toggleAllSelection(state) {
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
}

function changeSorting(state, by, direction) {
  return { ...state,
    tableSorting: { by, direction },
    tableData: sortBy(state.tableData, by, direction),
  };
}

function selectRange(state, action) {
  const items = state.tableData.map((item, index) => {
    delete item.__selected;
    if (index >= action.minIndex && index <= action.maxIndex) {
      item.__selected = true;
    }
    return item;
  });
  return { ...state, tableData: items, tableSelection: { ...state.tableSelection, latestSelectionType: 'range' } };
}

function handleItemsHasBeenRemoved(state) {
  return { ...state };
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
