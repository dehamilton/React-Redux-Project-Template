/* global _ */
import React from 'react';
import PropTypes from 'prop-types';

/*
  Higher order component for adding filter row to table.
*/
export default function filterableTableHoc(ComposedComponent) {
  return class TableExtend extends ComposedComponent {
    static propTypes = {
      tableData: PropTypes.any.isRequired,
    };

    constructor(props) {
      super(props);
      this.clonedData = [];
      this.itemSelected = this.itemSelected.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      const { tableData } = nextProps;
      this.clonedData = _.cloneDeep(tableData);
      if (this.clonedData.length > 0 && typeof this.clonedData[0].__filter === 'undefined') {
        this.clonedData.unshift({ __filter: true });
      } else if (this.clonedData.length === 0) {
        this.clonedData.unshift({ __filter: true });
      }
    }

    // replace itemSelected because we need to reset the index when using shift
    // due to adding new row.
    itemSelected(id, deselectAll, rowIndex, pressedKey) {
      let index = rowIndex;
      if (pressedKey === 'shiftKey') {
        index -= 1;
      }

      this.props.itemSelected(id, deselectAll, index, pressedKey);
    }

    render() {
      // eslint-disable-next-line no-unused-vars
      const { tableData, itemSelected, ...rest } = this.props;

      return <ComposedComponent tableData={this.clonedData} itemSelected={this.itemSelected} {...rest} />;
    }
  };
}
