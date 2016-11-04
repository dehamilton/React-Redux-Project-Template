/* global _ */
/* eslint-disable */
import React, { PropTypes } from 'react';

export default function statsTableHoc(ComposedComponent, location) {
  return class TableExtend extends ComposedComponent {
    static propTypes = {
      tableStats: PropTypes.object.isRequired,
    }

    render() {
      const { tableStats } = this.props;
      console.log('location', location);
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
