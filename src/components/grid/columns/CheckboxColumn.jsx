import React, { Component, PropTypes } from 'react';

export default class CheckboxColumn extends Component {

  static propTypes = {
    checked: PropTypes.bool.isRequired,
  }
  
  render() {
    const { checked } = this.props;
    const cname = checked ? 'fa-check' : 'fa-square-o';
    return (
      <span className={'table-cell'}>
        <i className={'fa fa-lg ' + cname} />
      </span>
    );
  }
}
