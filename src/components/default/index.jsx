import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gridActions from './grid/actions/actions';
import BbnaTable from './grid/index';
import filterableTableHoc from './grid/filter/FilterableTable';
import statsTableHoc from './grid/tableStats/CountableTable';

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
    const { changeThisName } = this.props.state;
    return (
      <FilterableTable
        tableData={changeThisName.tableData}
        tableStats={changeThisName.tableStats}
        tableSorting={changeThisName.tableSorting}
        isLoading={changeThisName.isLoading}
        openItemForEdit={() => {}}
        onAddClick={() => {}}
        helpLink={''}
      />
    );
  }
}
