/* eslint-disable no-extra-boolean-cast */
/* global _ */

import immutable, { Map } from 'immutable';
import * as actionConstants from 'constants/actionConstants';
import { sortBy, computeTableStats } from './gridUtils';

function selectItem(state: Map, action: Object): Map {
  let allItems = state.get('tableData').toJS();
  let selectedItems = [];
  const anItem = _.find(allItems, { id: action.itemId });
  const isSelected = anItem.__selected;

  if (action.deselectAll === true) {
    selectedItems = allItems.filter(i => i.__selected);
    const forceSelected = state.getIn(['tableSelection', 'latestSelectionType']) !== '' && selectedItems.length > 1;
    allItems = allItems.map((item) => { delete item.__selected; return item; });
    anItem.__selected = forceSelected ? true : !!!isSelected;
  } else {
    anItem.__selected = !!!anItem.__selected;
  }

  let latestIdSelected;
  if (action.pressedKey !== 'shiftKey' || state.getIn(['tableSelection', 'latestIdSelected']) === '') {
    latestIdSelected = anItem.__selected ? anItem.id : '';
  } else {
    latestIdSelected = state.getIn(['tableSelection', 'latestIdSelected']);
  }
  const latestSelectionType = action.pressedKey !== '' ? 'multiple' : '';
  const stats = computeTableStats(immutable.fromJS(allItems));

  return state.merge({
    tableData: allItems,
    tableStats: stats,
    tableSelection: { latestSelectionType, latestIdSelected },
  });
}

function toggleAllSelection(state: Map): Map {
  const currentCounters = computeTableStats(state.get('tableData'));
  const noneSelected = currentCounters.get('selected') === 0;
  const checkValue = noneSelected || currentCounters.get('someButNotAllSelected');

  const data = state.get('tableData').map(i => i.set('__selected', checkValue));
  const stats = computeTableStats(data);

  let selection = state.get('tableSelection');
  selection = selection.set('latestIdSelected',
                data.size > 0 && stats.get('allSelected') ? data.first().get('id') : '');
  selection = selection.set('latestSelectionType', 'multiple');

  return state.merge({
    tableData: data,
    tableStats: stats,
    tableSelection: selection,
  });
}

function changeSorting(state: Map, by: string, direction: string): Map {
  return state.merge({
    tableData: sortBy(state.get('tableData').toJS(), by, direction),
    tableSorting: { by, direction },
  });
}

function selectRange(state: Map, action: Object): Map {
  const items = state.get('tableData').map((item, index) => {
    let newItem = item.delete('__selected');
    if (index >= action.minIndex && index <= action.maxIndex) {
      newItem = item.set('__selected', true);
    }
    return newItem;
  });

  const stats = computeTableStats(items);
  const selection = state.get('tableSelection');
  selection.latestSelectionType = 'range';

  return state.merge({
    tableData: items,
    tableStats: stats,
    tableSelection: selection,
  });
}

function handleItemsHasBeenRemoved(state: Map): Map {
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
