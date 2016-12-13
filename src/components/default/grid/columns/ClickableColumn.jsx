/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ClickableColumn extends Component {
  static propTypes = {
    rowId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { rowId, onClick } = this.props;

    onClick(rowId);

    e.stopPropagation();
  }


  render() {
    const { text, rowId } = this.props;

    return (
      <span>
        <Link to={'/item/' + rowId}>{text}</Link>
      </span>
    );
  }
}
