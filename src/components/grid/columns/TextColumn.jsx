import React, { Component, PropTypes } from 'react';

export default class TextColumn extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }

  render() {
    const { text, onClick } = this.props;
    return (
      <span className="table-cell" onClick={onClick}>
        <span title={text} className="table-cell-ellipsis">
          {text}
        </span>
      </span>
    );
  }
}