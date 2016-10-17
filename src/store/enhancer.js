
export default function enhancerTest() {
  return next => (reducer, initialState, enhancer) => {
    const store = next(reducer, initialState, enhancer);

    return {
      ...store,
      dispatch(action) {
        store.dispatch(action);

        if (action.action.cacheable) {
          console.log('cacheable action result', action);
        }

        return action;
      },
    };
  };
}
