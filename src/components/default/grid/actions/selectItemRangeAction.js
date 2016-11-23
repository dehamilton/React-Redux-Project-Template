/* eslint-disable no-extra-boolean-cast, import/prefer-default-export */
/* global _ */

const selectItemRangeAction = {
  type: 'SELECT_ITEM_RANGE',
  get create() {
    return (minIndex, maxIndex) => (
      {
        type: this.type,
        minIndex,
        maxIndex,
      }
    );
  },
  get register() {
    return {
      [this.type]: (state, action) => this.selectRange(state, action),
    };
  },
  selectRange: (state, action) => {
    const items = state.tableData.map((item, index) => {
      delete item.__selected;
      if (index >= action.minIndex && index <= action.maxIndex) {
        item.__selected = true;
      }
      return item;
    });
    return { ...state, tableData: items, tableSelection: { ...state.tableSelection, latestSelectionType: 'range' } };
  },
};

const action = selectItemRangeAction.create;
const register = selectItemRangeAction.register;
export { action as selectItemRangeAction, register };
