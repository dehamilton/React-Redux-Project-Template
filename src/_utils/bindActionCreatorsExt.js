import { bindActionCreators } from 'redux';

export function bindActionCreatorsExt(actions, dispatch) {
  const _actions = Object
    .keys(actions)
    .reduce((result, key) => {
      const action = actions[key].create || actions[key].action;

      result[key] = (...args) => {
        const value = action(...args);
        if (typeof value.type === 'undefined') {
          value.type = key;
        }
        return value;
      };

      return result;
    }, {});

  return bindActionCreators(_actions, dispatch);
}
