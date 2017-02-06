import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class EditableItem extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  render() {
    const item = this.props.state.changeThisName.get('tableData').filter(i => i.get('id') === this.props.params.id);

    return (
      <div>
        <div>Return to <Link to="/">grid</Link>.</div>
        <div>Data</div>
        <div>{item.first().get('id')}</div>
      </div>
    );
  }
}