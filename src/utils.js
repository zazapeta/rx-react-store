export function getComponentName(component) {
  return component.displayName || component.name || 'Component';
}

/**
 * promisfy a map of hooks
 * @param {Map} hooks
 * @param {*} args
 */
export function promiseAllMap(hooks, ...args) {
  return Promise.all(
    Array.from(hooks.values()).map((h) => Promise.resolve(h(...args))),
  );
}

/**
 * Resole sequential map
 * @param {Map} hooks
 * @param {*} args
 */
export async function promiseSeqMap(hooks, ...args) {
  for (const [_, mw] of hooks) {
    await mw(...args);
  }
}
