/* eslint-disable import/prefer-default-export, arrow-body-style */

const deleteItemsAction = {
  type: 'ITEMS_DELETED',
  get action() {
    return () => (
      {
        type: this.type,
      }
    );
  },
  get creator() {
    return () => {
      return (dispatch) => {
        dispatch(this.action());
      };
    };
  },
  get register() {
    return {
      [this.type]: state => this.deleteItems(state),
    };
  },
  deleteItems(state) {
    return { ...state };
  },
};

const action = deleteItemsAction.action;
const creator = deleteItemsAction.creator;
const register = deleteItemsAction.register;
export { action as deleteItemsAction, creator as deleteItems, register };
