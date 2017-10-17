/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ClickableColumn extends Component {
  static propTypes = {
    rowId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }

  render() {
    const { text, rowId } = this.props;

    return (
      <Link to={'/item/' + rowId}>{text}</Link>
    );
  }
}
