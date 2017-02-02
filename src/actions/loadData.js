export const loadData = {
  type: 'loadData',
  get action() {
    return () => (
      {
        type: this.type,
        data: [
          { id: '1', name: 'Test Row 1', lastEditedUtc: '2016-09-12T18:25:30.907', __selected: false },
          { id: '2', name: 'Test Row 2', lastEditedUtc: '2016-09-13T18:25:30.907', __selected: false },
          { id: '3', name: 'Test Row 3', lastEditedUtc: '2016-09-14T18:25:30.907', __selected: false },
          { id: '4', name: 'Test Row 4', lastEditedUtc: '2016-09-15T18:25:30.907', __selected: false },
          { id: '5', name: 'Test Row 5', lastEditedUtc: '2016-09-16T18:25:30.907', __selected: false },
        ],
      }
    );
  },
  get create() {
    return () => dispatch => dispatch(this.action());
  },
  get reducer() {
    return (state, action) => this.loadTableData(state, action);
  },
  loadTableData(state, action) {
    return { ...state, tableData: action.data, tableDataOriginal: action.data };
  },
};
