import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreatorsExt } from '_utils/bindActionCreatorsExt';
import { GlobalActions } from 'actions/export';

@connect(state => ({ state }),
  dispatch => bindActionCreatorsExt(GlobalActions, dispatch)
)
export default class EditableItem extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  render() {
    const item = this.props.state.changeThisName
      .get('tableData')
      .filter(i => i.get('id') === this.props.match.params.id);

    return (
      <div>
        <div>Return to <Link to="/">grid</Link>.</div>
        <div>Data</div>
        <div>{item.first().get('id')}</div>
      </div>
    );
  }
}
