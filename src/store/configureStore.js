/* global __DEVTOOLS__ */
let configStore = () => {};
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  configStore = require('./dev-store').default;
} else {
  // eslint-disable-next-line global-require
  configStore = require('./prod-store').default;
}

export default function configureStore(initialState) {
  return configStore(initialState);
}
