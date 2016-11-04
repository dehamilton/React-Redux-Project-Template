/* eslint-disable prefer-rest-params, react/react-in-jsx-scope */
import React from 'react';

function handleDescriptor(target, key, descriptor) {
  const callback = descriptor.value;
  return {
    ...descriptor,
    value() {
      const args = arguments;
      if (args[0].rowData.__filter) {
        return (
          <input
            id={`search_${args[1]}`}
            type="search"
            className="bbna-filterinput form-control"
            value={this.state[args[1]]}
            onChange={e => args[2](e, args[1])}
          />
        );
      }

      return callback.apply(this, args);
    },
  };
}

export default function filterableCell(...args) {
  return handleDescriptor(...arguments, args);
}
