import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextColumn extends Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  render() {
    const { text, onClick } = this.props;
    return (
      <span title={text} className="table-cell-ellipsis" onClick={onClick}>
        {text}
      </span>
    );
  }
}
