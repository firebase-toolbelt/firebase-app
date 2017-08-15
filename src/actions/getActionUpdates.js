import validate from 'validate-properties';
import getLogOwners from './utils/getLogOwners';
import getLogUpdates from './utils/getLogUpdates';
import defaultCreateId from './utils/defaultCreateId';
import parseUpdates from './utils/parseUpdates';

function buildGetActionUpdates(config) {

  /**
   * Use firebase for id creation
   */

  const createId = config.firebase
    ? config.firebase.database().ref().push : defaultCreateId;

  /**
   * Build log owners
   */

  const logOwners = getLogOwners(config);

  /**
   * Build log updates creator
   */

  const getLogUpdates = buildGetLogUpdates(config, logOwners, createId);

  /**
   * Build getActionUpdates
   */

  return function getActionUpdates(action, payload) {

    let returnables = {};
    let validations = [];
    let payload = payload;

    /**
     * Check if all log owners are defined.
     */

    if (action.log && action.log.some((owner) => !config.owners[ownerId])) {
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
        payload = { ...payload, [propName]: newId };
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
    const helpers = {
      createId,
      localNow: localNow,
      now: config.firebase ? config.firebase.database.ServerValue.TIMESTAMP : localNow,
      addToReturnables: (key, value) => returnables[key] = value
    };

    /**
     * Create and parse action updates.
     * Then merge them with the automatically generated log updates.
     */

    return parseUpdates(action.updates(payload, helpers))
      .then((updates) => ({
        updates: { ...updates, ...getLogUpdates(action, payload) },
        returnables: returnables
      }));
    
  };
}
