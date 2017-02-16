import React, { Component } from 'react';
import AutoSizer from 'components/default/grid/autosizer/AutoSizer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gridActions from './actions/actions';
import BbnaTable from './BbnaTable';
import filterableTableHoc from './filter/FilterableTable';
import statsTableHoc from './tableStats/CountableTable';

const Filterable = connect(
  () => ({}),
  dispatch => bindActionCreators(gridActions, dispatch))(statsTableHoc(filterableTableHoc(BbnaTable), 'above'));

export default class FilterableTable extends Component {
  render() {
    const { ...rest } = this.props;
    return (
      <AutoSizer>
        {({ width, height }) => (
          <Filterable
            width={width}
            height={height}
            {...rest}
          />
        ) }
      </AutoSizer>
    );
  }
}
