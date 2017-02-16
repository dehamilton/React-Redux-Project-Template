import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FilterableTable from './grid/FilterableTable';

export default class MainContainer extends Component {
  static propTypes = {
    initModule: PropTypes.func.isRequired,
    testTypecheck: PropTypes.func.isRequired,
    loadData: PropTypes.func.isRequired,
    loadMoreData: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.initModule();
    this.props.testTypecheck(true, 'string');
    this.props.loadData();
  }

  render() {
    const { changeThisName } = this.props.state;
    return (
      <div style={{ height: '90%' }}>
        <div>See Input Samples, <Link to="/inputs">here</Link>.</div>
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
