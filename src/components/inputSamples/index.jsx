import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class MainContainer extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <div>Return to <Link to="/">grid</Link>.</div>
        <div>Input Samples to demonstrate typical usage of controlled inputs.</div>
      </div>
    );
  }
}
