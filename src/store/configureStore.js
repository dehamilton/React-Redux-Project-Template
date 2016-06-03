/* global __DEVTOOLS__ */
let configStore = () => {};
if (process.env.NODE_ENV !== 'production') {
  configStore = require('./dev-store').default;
} else {
  configStore = require('./prod-store').default;
}

export default function configureStore(initialState) {
  if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
    const store = configStore(initialState);

    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers/index').default);
    });
    return store;
  }

  return configStore(initialState);
}
