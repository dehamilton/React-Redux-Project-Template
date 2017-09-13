import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CheckboxColumn extends Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    clickAction: PropTypes.func.isRequired,
    cellInfo: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
  }

  clickAction(e) {
    this.props.clickAction(e, this.props.cellInfo, false);
  }

  render() {
    const { checked } = this.props;
    return (
      <label htmlFor={this.props.name}>
        <input
          id={this.props.name}
          type="checkbox"
          className="sr-only"
          checked={checked}
          value={checked}
          onChange={e => this.clickAction(e)}
        />
        <i className="fa" />
      </label>
    );
  }
}
