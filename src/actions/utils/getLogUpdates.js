export default function buildGetLogUpdates(getLogPath, createId) {
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
        ? omit(payload, logOmit) : payload;
        
      const metaPayload = {
        __action: action.id,
        __authUserId: helpers.authUserId,
        __timestamp: helpers.now
      };

      const mergedPayload = { ...parsedPayload, ...metaPayload };

      /**
       * Save the payload on both log paths.
       * This is necessary so the firebase-rules is more efficient.
       * Although there is a 100% upload increase because of this,
       * actions are not used nearly enough as read operations,
       * this should not be a concern for the application.
       */

      const logPaths = getLogPath(action, payload, ownerId, logId, action.logHidden);

      acc[logPaths.actions] = mergedPayload;
      acc[logPaths.list] = mergedPayload;

      return acc;
    }, {});
  };
}
