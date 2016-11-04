/* global _ */
import React, { PropTypes } from 'react';

export default function filterableTableHoc(ComposedComponent) {
  return class TableExtend extends ComposedComponent {
    static propTypes = {
      tableData: PropTypes.array.isRequired,
    };

    constructor(props) {
      super(props);
      this.clonedData = [];
    }

    componentWillReceiveProps(nextProps) {
      const { tableData } = nextProps;
      this.clonedData = _.cloneDeep(tableData);
      if (this.clonedData.length > 0 && typeof this.clonedData[0].__filter === 'undefined') {
        this.clonedData.unshift({ __filter: true });
      }
    }

    render() {
      // eslint-disable-next-line no-unused-vars
      const { tableData, ...rest } = this.props;
      return <ComposedComponent tableData={this.clonedData} {...rest} />;
    }
  };
}
