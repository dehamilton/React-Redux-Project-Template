/* eslint-disable max-len, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

require('./EmptyStateView.scss');

export default class EmptyStateView extends Component {
  static propTypes = {
    onAddClick: PropTypes.func.isRequired,
    helpLink: PropTypes.string.isRequired,
  }

  render() {
    const { onAddClick, helpLink } = this.props;

    return (
      <div className="noRows">
        <div className="noRows-forms">
          <h4>There are no entries.</h4>
          <i className="fa fa-print fa-4x" />
          <p><span>To get started, </span>
            <a onClick={onAddClick}>add a new entry</a><span> or </span>
            <br />
            <a href={helpLink} target="_blank" rel="noopener noreferrer">learn more about entries.</a>
          </p>
        </div>
      </div>
    );
  }
}
