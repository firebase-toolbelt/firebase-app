const validateProperties = require('./validateProperties');
const parseUpdates = require('./parseUpdates');

module.exports = function getActionUpdates(action, payload) {

  if (action.validate) {
    const errors = validateProperties(payload, action.validate, true);
    if (errors.length) {
      return new Error(errors.toString());
    }
  }

  return parseUpdates(action.updates(payload));

}
