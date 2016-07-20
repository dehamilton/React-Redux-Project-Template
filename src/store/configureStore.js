/* global __DEVTOOLS__ */
let configStore = () => {};
if (process.env.NODE_ENV !== 'production') {
  configStore = require('./dev-store').default;
} else {
  configStore = require('./prod-store').default;
}

export default function configureStore(initialState) {
  return configStore(initialState);
}
