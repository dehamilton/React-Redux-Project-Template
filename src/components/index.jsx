import React, { Component, PropTypes } from 'react';
import BbnaTable from './grid/index';

export default class MainContainer extends Component {
  static propTypes = {
    initModule: PropTypes.func.isRequired,
    testTypecheck: PropTypes.func.isRequired,
    loadData: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }
  
  constructor(props) {
    super(props);
    this.props.initModule();
    this.props.testTypecheck(true, 'string');
    this.props.loadData();
  }
  
  render() {
    const { reducers } = this.props.state;
    return (
      <div>
        template running
        <BbnaTable
          tableData={reducers.tableData}
          tableStats={reducers.tableStats}
          tableSorting={reducers.tableSorting}
          isLoading={reducers.isLoading}
          openItemForEdit={() => {}}
          onAddClick={() => {}}
          helpLink={''}
        />
      </div>
    );
  }
}
