const { getActionUpdates } = require('../updates');

module.exports = function executeActionUpdate(action, data, firebaseRef) {
  return getActionUpdates(action, data)
    .then(updates => (
      firebaseRef.updates(updates)
    ));
}