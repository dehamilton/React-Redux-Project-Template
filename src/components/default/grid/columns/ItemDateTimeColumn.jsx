import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class ItemDateTimeColumn extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
  }

  render() {
    const { date, format } = this.props;
    return (<span>{moment(date).format(format)}</span>);
  }
}
