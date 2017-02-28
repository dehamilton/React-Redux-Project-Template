export const loadMoreData = {
  type: 'loadMoreData',
  get action() {
    return () => (
      {
        type: this.type,
        data: [
          { id: '1',
            name: 'Test Row 1',
            randomText: 'May musical arrival beloved luckily adapted him',
            lastEditedUtc: '2016-09-12T18:25:30.907',
            __selected: false,
          },
          { id: '2',
            name: 'Test Row 2',
            randomText: 'Pleased him another was settled for',
            lastEditedUtc: '2016-09-13T18:25:30.907',
            __selected: false,
          },
          { id: '3',
            name: 'Test Row 3',
            randomText: 'Mind what no by kept',
            lastEditedUtc: '2016-09-14T18:25:30.907',
            __selected: false,
          },
          { id: '4',
            name: 'Test Row 4',
            randomText: 'Celebrated impossible my uncommonly particular by oh introduced inquietude do',
            lastEditedUtc: '2016-09-15T18:25:30.907',
            __selected: false,
          },
          { id: '5',
            name: 'Test Row 5',
            randomText: 'Stanhill on we if vicinity material in',
            lastEditedUtc: '2016-09-16T18:25:30.907',
            __selected: false,
          },
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
    const data = state.get('tableData').toJS();
    const newData = data.concat(action.data);
    return state.merge({ tableData: newData, tableDataOriginal: newData });
  },
};
