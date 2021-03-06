const validate = require('validate-properties');
const buildGetLogUpdates = require('./utils/getLogUpdates');
const defaultCreateId = require('./utils/defaultCreateId');
const parseUpdates = require('./utils/parseUpdates');

module.exports = function buildGetActionUpdates(config, logOwners, getLogPath) {

  /**
   * Use firebase for id creation
   */

  const createId = config.firebase
    ? config.firebase.database().ref().push : defaultCreateId;

  /**
   * Build log updates creator
   */

  const getLogUpdates = buildGetLogUpdates(getLogPath, createId);

  /**
   * Build getActionUpdates
   */

  return function getActionUpdates(action, _payload = {}, options = {}) {

    let returnables = {};
    let validations = [];
    let payload = _payload;

    /**
     * Check if all log owners are defined.
     */

    if (action.log && action.log.some((ownerId) => !config.owners[ownerId])) {
      return Promise.reject(new Error('All log owners must be defined. ' + action));
    }

    /**
     * If 'create' is specified,
     * create new id's and place them on the payload object.
     * These are automatically added to the action return object.
     */

    if (action.create) {
      [].concat(action.create).forEach((propName) => {
        const newId = createId();
        returnables[propName] = newId;
        payload = Object.assign({}, payload, { [propName]: newId });
      });
    }

    /**
     * Add owner validations to the validations object.
     */

    if (action.log) {
      action.log.forEach((ownerId) => {
        validations = validations.concat(logOwners[ownerId].validate);
      });
    } 

    /**
     * Validate the payload.
     */
    
    if (validations) {
      const errors = validate(payload, validations, true);
      if (errors.length) {
        return Promise.reject(new Error('All validations must be met. ' + errors.toString()));
      }
    }

    /**
     * Create the helpers object to be used in the updates creator.
     */

    const localNow = Date.now();

    const now = config.firebase
      ? config.firebase.database.ServerValue.TIMESTAMP
      : localNow;

    const authUserId = config.firebase
      ? config.firebase.auth().currentUser
      : options.authUserId || 'authUserId';

    const helpers = {
      createId,
      authUserId,
      localNow,
      now,
      addToReturnables: (key, value) => returnables[key] = value
    };

    /**
     * Create and parse action updates.
     * Then merge them with the automatically generated log updates.
     */
    
    return parseUpdates(action.updates(payload, helpers))
      .then((updates) => ({
        updates: Object.assign({}, updates, getLogUpdates(action, payload, helpers)),
        returnables: returnables
      }));
    
  };
}
