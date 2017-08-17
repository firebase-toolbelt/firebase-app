module.exports = function buildGetLogUpdates(getLogPath, createId) {
  return function getLogUpdates(action, payload, helpers) {

    /**
     * Fetch the action log owners.
     * If action has no log owner, define the owner as the blank owner.
     * This is necessary so the action is checked on the firebase-rules.
     */
  
    const owners = action.log || [null];
  
    return owners.reduce((acc, ownerId) => {

      /**
       * Create logId and save it in the action returnables.
       */

      const logId = createId();

      helpers.addToReturnables(`logId/${ownerId}`, logId);

      /**
       * Create the log payload.
       */

      const parsedPayload = action.logOmit
        ? omit(payload, action.logOmit) : payload;

      const logPath = getLogPath(payload, ownerId, logId, action.logHidden);

      acc[logPath] = {
        __action: action.id,
        __authUserId: helpers.authUserId,
        __timestamp: helpers.now,
        action: {
          [action.id]: parsedPayload
        }
      };

      return acc;
    }, {});
  };
}
