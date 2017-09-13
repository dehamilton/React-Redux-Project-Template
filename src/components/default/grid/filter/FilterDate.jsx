import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as filterActions from './actions/actions';

require('react-datepicker/dist/react-datepicker.css');

@connect(
  state => ({ filters: state.changeThisName.get('tableFilters').toJS() }),
  dispatch => bindActionCreators(filterActions, dispatch)
)
export default class FilterDate extends Component {
  static propTypes = {
    filterName: PropTypes.string.isRequired,
    filterGrid: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const date = this.props.filters[this.props.filterName] === ''
      ? null : moment(this.props.filters[this.props.filterName], 'MM/DD/YYYY');

    this.state = {
      startDate: date,
    };
  }

  componentWillReceiveProps(nextProps) {
    const date = nextProps.filters[nextProps.filterName] === ''
      ? null : moment(nextProps.filters[this.props.filterName], 'YYYY-MM-DD');

    this.setState({ startDate: date });
  }

  onDateChange = (filterName, date) => {
    if (date === null) {
      this.setState({ startDate: null });
      this.props.filterGrid(this.props.filterName, '', 'date');
      return;
    }
    this.setState({ startDate: date });
    this.props.filterGrid(this.props.filterName, date.format('YYYY-MM-DD'), 'date');
  }

  render() {
    return (
      <div>
        <DatePicker
          id={`dateselect_${this.props.filterName}`}
          isClearable
          selected={this.state.startDate}
          onChange={(date) => { this.onDateChange(this.props.filterName, date); }}
        />
      </div>
    );
  }
}
