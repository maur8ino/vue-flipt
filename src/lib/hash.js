// A simple function that hashes the request object ordering keys on the context object
export function hash({ entityId, flagKey, context: unsortedContext = {} }) {
  const contextKeys = Object.keys(unsortedContext);
  contextKeys.sort();
  const context = contextKeys.reduce((acc, key) => {
    acc[key] = unsortedContext[key];
    return acc;
  }, {});
  return JSON.stringify({ entityId, flagKey, context });
}
