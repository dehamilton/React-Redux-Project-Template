import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as filterActions from './actions/actions';

@connect(
  () => ({ }),
  dispatch => bindActionCreators(filterActions, dispatch)
)
export default class FilterClear extends Component {
  static propTypes = {
    filterClear: PropTypes.func.isRequired,
  };

  onClick = () => {
    this.props.filterClear();
  }

  render() {
    return (
      <button
        onClick={this.onClick}
        type="button"
        className="btn btn-default bbna-filterbutton"
        style={{ width: '38px' }}
        title="Clear search criteria"
      >
        <i className="fa fa-eraser" />
      </button>
    );
  }
}
