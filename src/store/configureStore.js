/* global __DEVTOOLS__ */
import * as devStore from './dev-store';
import * as prodStore from './prod-store';

export default function configureStore(initialState) {
  if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
    const store = devStore.configureStore(initialState);

    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers/index').default);
    });
    return store;
  }

  return prodStore.configureStore(initialState);
}
