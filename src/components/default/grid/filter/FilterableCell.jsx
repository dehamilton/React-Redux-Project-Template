/* eslint-disable prefer-rest-params, react/react-in-jsx-scope */
import React from 'react';
// import FilterDate from './FilterDate';
import FilterInput from './FilterInput';
import FilterClear from './FilterClear';

/*
  Decorator for BbnaTable cell renderers
*/
export default function filterableCell() {
  const filterOptions = this;
  return handleDescriptor(...arguments, filterOptions);
}

function handleDescriptor(target, key, descriptor, filterOptions) {
  const callback = descriptor.value;

  let filterType = 'text';
  if (typeof filterOptions.filterType !== 'undefined' && filterOptions.filterType.length > 0) {
    ({ filterType } = filterOptions);
  }

  let filterProperty = '';
  if (typeof filterOptions.filterProperty !== 'undefined' && filterOptions.filterProperty.length > 0) {
    ({ filterProperty } = filterOptions);
  }

  let filterMaxLength = 100;
  if (typeof filterOptions.filterMaxLength !== 'undefined') {
    ({ filterMaxLength } = filterOptions);
  }

  return {
    ...descriptor,
    value() {
      const args = arguments;
      if (args[0].rowData.__filter && filterProperty !== '') {
        switch (filterType) {
          case 'clear':
            return (
              <FilterClear />
            );
          // case 'date':
          //   return (
          //     <div className={'input-group'}>
          //       <FilterDate filterName={'min' + filterProperty} filterType={filterType} />
          //       <span className="input-group-addon">To</span>
          //       <FilterDate filterName={'max' + filterProperty} filterType={filterType} />
          //     </div>
          //   );
          default:
            return (
              <div className="filter-input">
                <FilterInput filterName={filterProperty} filterType={filterType} maxLength={filterMaxLength} />
              </div>);
        }
      }
      return callback.apply(this, args);
    },
  };
}
