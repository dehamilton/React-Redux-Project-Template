import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

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
