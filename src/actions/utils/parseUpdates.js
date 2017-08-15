/**
 * Normalizes update results into a single object.
 * Update results may be:
 * - an array of promises resolving to an array of update objects
 * - a single promise resolving to the updates object
 * - a simple update object
 */

export default function parseUpdates(updates) {
  return Promise.resolve(updates)
    .then((result) => (result.length) ? Object.assign({}, ...result) : result);
}
