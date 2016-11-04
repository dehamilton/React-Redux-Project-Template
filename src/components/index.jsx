import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gridActions from './grid/actions';
import BbnaTable from './grid/index';
import filterableTableHoc from './grid/FilterableTable';
import statsTableHoc from './grid/CountableTable';

const FilterableTable = connect(
  () => ({}),
  dispatch => bindActionCreators(gridActions, dispatch))(filterableTableHoc(statsTableHoc(BbnaTable, 'above')));

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
      <FilterableTable
        tableData={reducers.tableData}
        tableStats={reducers.tableStats}
        tableSorting={reducers.tableSorting}
        isLoading={reducers.isLoading}
        openItemForEdit={() => {}}
        onAddClick={() => {}}
        helpLink={''}
      />
    );
  }
}
