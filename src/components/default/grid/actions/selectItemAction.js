/* eslint-disable no-extra-boolean-cast, import/prefer-default-export */
/* global _ */
import { computeTableStats } from './gridUtils';

const selectItemAction = {
  type: 'SELECT_ITEM',
  get create() {
    return (itemId, deselectAll, pressedKey) => (
      {
        type: this.type,
        itemId,
        deselectAll,
        pressedKey,
      }
    );
  },
  get register() {
    return {
      [this.type]: (state, action) => this.selectItem(state, action),
    };
  },
  selectItem: (state, action) => {
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
  },
};

const action = selectItemAction.create;
const register = selectItemAction.register;
export { action as selectItemAction, register };
