import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreatorsExt } from '_utils/bindActionCreatorsExt';
import { TestActions } from 'actions/export';
import { FilterableTable } from './grid/FilterableTable';

@connect(state => ({ state }),
  dispatch => bindActionCreatorsExt(TestActions, dispatch)
)
export default class MainContainer extends Component {
  static propTypes = {
    initModule: PropTypes.func.isRequired,
    loadData: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.initModule();
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
