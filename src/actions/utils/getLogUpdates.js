export default function buildGetLogUpdates(config, logOwners, createId) {

  const basePath = config.logBasePath || '__log__';
  const hiddenPath = config.logHiddenPath || '__log_hidden__';
  const blankOwner = config.logBlankPath || '__';

  return function getLogUpdates(action, payload, helpers) {
  
    const owners = action.log || [blankOwner];
  
    return owners.reduce((acc, ownerId) => {

      const logId = createId();

      helpers.addToReturnables(`logId/${ownerId}`, logId);
      
      const owner = logOwners[ownerId];
      const actionBasePath = action.logHidden ? hiddenPath : basePath;
      const logPath = `${actionBasePath}/${ownerId}/${owner.path(payload)}/${logId}/${action.id}`;

      const parsedPayload = action.logOmit
        ? omit(payload, logOmit) : payload;
        
      const metaPayload = {
        __authUserId: helpers.authUserId,
        __timestamp: helpers.now
      };

      acc[logPath] = { ...parsedPayload, ...metaPayload };

      return acc;
    }, {});
  };
}
