/**
 * Should only be used for offline testing.
 */

let id = 0;

module.exports = function defaultCreateId() {
  return id++;
};
