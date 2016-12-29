/* global _ */
/* eslint-disable */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tableStatsAction from './actions/actions';

@connect(() => ({}),
  dispatch => bindActionCreators(tableStatsAction, dispatch)
)
export default function statsTableHoc(ComposedComponent, location) {
  return class TableExtend extends ComposedComponent {
    static propTypes = {
      tableStats: PropTypes.object.isRequired,
      computeStats: PropTypes.func.isRequired,
    }

    componentWillMount() {
      this.props.computeStats();
    }

    render() {
      const { tableStats } = this.props;

      return (
        <div>
          <div style={{ backgroundColor: '#666', color: 'white' }}>
            <span>Total Items: {tableStats.total}</span>
            <span>Total Selected: {tableStats.selected}</span>
          </div>
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  };
}
