
export function handleActionsExt(actions) {
  const handlers = Object
    .keys(actions)
    .reduce((result, key) => {
      result[key] = actions[key].reducer;
      return result;
    }, {});

  return handlers;
}
