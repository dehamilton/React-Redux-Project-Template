/* eslint-disable jsx-a11y/label-has-for */
import React, { Component, PropTypes } from 'react';

export default class IndeterminateCheckBoxHeader extends Component {
  static propTypes = {
    tableStats: PropTypes.object.isRequired,
    clickAction: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.onHeaderClick = this.onHeaderClick.bind(this);
  }

  onHeaderClick() {
    this.props.clickAction();
  }

  render() {
    const tooltipText = this.props.tableStats.selected + ' of ' + this.props.tableStats.total + ' selected';
    return (
      <label>
        <input
          className="sr-only"
          type="checkbox"
          checked={this.props.tableStats.allSelected}
          disabled={this.props.tableStats.total === 0}
          onClick={this.onHeaderClick}
          readOnly
          ref={(input) => {
            if (input) {
              input.indeterminate = this.props.tableStats.someButNotAllSelected;
            }
          }}
        />

        <i className="fa" title={tooltipText}>
          <span />
        </i>
      </label>
    );
  }
}
