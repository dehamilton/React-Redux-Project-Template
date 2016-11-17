/* eslint-disable prefer-rest-params, react/react-in-jsx-scope */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as filterActions from './actions/actions';

/*
  Decorator for BbnaTable cell renderers
*/
export default function filterableCell() {
  const filterOptions = this;
  return handleDescriptor(...arguments, filterOptions);
}

function handleDescriptor(target, key, descriptor, filterOptions) {
  const callback = descriptor.value;

  let filterType = 'string';
  if (typeof filterOptions.filterType !== 'undefined' && filterOptions.filterType.length > 0) {
    filterType = filterOptions.filterType;
  }

  let filterProperty = '';
  if (typeof filterOptions.filterProperty !== 'undefined' && filterOptions.filterProperty.length > 0) {
    filterProperty = filterOptions.filterProperty;
  }

  return {
    ...descriptor,
    value() {
      const args = arguments;
      if (args[0].rowData.__filter && filterProperty !== '') {
        return <FilterInput filterName={filterProperty} filterType={filterType} />;
      }

      return callback.apply(this, args);
    },
  };
}

/*
  React component returned for filterable cell renderers.
  Keeps filter-related state out of table component.
  Use this component to provide different actions based on how you want to filter,
  or create a separate component for each filter type,
  or ...
*/
@connect(() => ({}),
  dispatch => bindActionCreators(filterActions, dispatch)
)
class FilterInput extends Component {
  static propTypes = {
    filterName: PropTypes.string.isRequired,
    filterType: PropTypes.string.isRequired,
    filterGrid: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { filter: '' };
    this.filter = this.filter.bind(this);
  }

  filter(e) {
    this.setState({ filter: e.target.value });
    this.props.filterGrid(this.props.filterName, this.props.filterType, e.target.value);
  }

  render() {
    return (
      <input
        id={`search_${this.props.filterName}`}
        type="search"
        className="bbna-filterinput form-control"
        value={this.state.filter}
        onChange={e => this.filter(e)}
      />
    );
  }
}

