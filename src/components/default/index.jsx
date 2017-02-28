import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreatorsExt } from '_utils/bindActionCreatorsExt';
import { GlobalActions } from 'actions/export';
import FilterableTable from './grid/FilterableTable';

@connect(state => ({ state }),
  dispatch => bindActionCreatorsExt(GlobalActions, dispatch)
)
export default class MainContainer extends Component {
  static propTypes = {
    initModule: PropTypes.func.isRequired,
    loadData: PropTypes.func.isRequired,
    loadMoreData: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.initModule();
    this.props.loadData();
  }

  render() {
    const { changeThisName } = this.props.state;
    return (
      <div style={{ height: '90%' }}>
        <div>Load more data <button onClick={this.props.loadMoreData}>Load</button></div>
        <FilterableTable
          tableData={changeThisName.get('tableData').toJS()}
          tableStats={changeThisName.get('tableStats').toJS()}
          tableSorting={changeThisName.get('tableSorting').toJS()}
          isLoading={changeThisName.get('isLoading')}
          openItemForEdit={() => {}}
          onAddClick={() => {}}
          helpLink={''}
        />
      </div>
    );
  }
}
