/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, PropTypes } from 'react';
import { SortIndicator } from 'react-virtualized';

export default class SortableHeader extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    columnKey: PropTypes.string.isRequired,
    sorting: PropTypes.object.isRequired,
    onSortChanged: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleSortChanged = this.handleSortChanged.bind(this);
  }
  
  handleSortChanged() {
    const { onSortChanged, columnKey, sorting } = this.props;
    onSortChanged(columnKey, sorting.direction);
  }

  renderSortDir() {
    return (<SortIndicator sortDirection={this.props.sorting.direction} />);
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    var { label, sorting, columnKey, onSortChanged, ...rest } = this.props;

    const mustRenderSortIndicator = sorting.by === columnKey;

    return (
      <a {...rest} onClick={this.handleSortChanged}>
        {label} {mustRenderSortIndicator ? this.renderSortDir() : null }
      </a>
    );
  }
 }
