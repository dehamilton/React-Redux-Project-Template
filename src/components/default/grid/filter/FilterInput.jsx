import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as filterActions from './actions/actions';

@connect(
  state => ({ filters: state.changeThisName.get('tableFilters').toJS() }),
  dispatch => bindActionCreators(filterActions, dispatch)
)
export default class FilterInput extends Component {
  static propTypes = {
    filterName: PropTypes.string.isRequired,
    filterGrid: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    maxLength: PropTypes.number,
  };

  static defaultProps = {
    maxLength: 200,
  };

  constructor(props) {
    super(props);

    this.filter = this.filter.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      focused: false,
      filter: this.props.filters[this.props.filterName],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filter: nextProps.filters[this.props.filterName] });
  }

  onChange(e) {
    this.setState({ filter: e.target.value });
  }

  filter(e) {
    if (e.charCode === 13) {
      this.props.filterGrid(this.props.filterName, e.target.value, 'text');
    } else if (e.charCode === 8 || e.charCode === 46) {
      this.setState({ filter: null });
    }
  }

  render() {
    var className = 'bbna-filterinput form-control ' + this.props.filterName;
    return (
      <input
        id={`search_${this.props.filterName}`}
        type="search"
        className={className}
        value={this.state.filter}
        onChange={e => this.onChange(e)}
        onKeyPress={e => this.filter(e)}
        maxLength={this.props.maxLength}
      />
    );
  }
}
