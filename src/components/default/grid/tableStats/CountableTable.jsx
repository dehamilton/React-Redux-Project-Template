/* global _ */
/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
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
        <div className="stats">
          { location === 'below' ? <ComposedComponent {...this.props} /> : '' }
          <div style={{ backgroundColor: '#666', color: 'white', height: '20px', marginTop: '10px' }}>
            <span>Total Items: {tableStats.total}</span>
            <span>Total Selected: {tableStats.selected}</span>
          </div>
          { location === 'above' ? <ComposedComponent {...this.props} /> : '' }
        </div>
      );
    }
  };
}
