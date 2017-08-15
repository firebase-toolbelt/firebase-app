export default function buildGetLogUpdates(config, logOwners, createId) {

  const basePath = config.logBasePath || '__log__';
  const hiddenPath = config.logHiddenPath || '__log_hidden__';
  const blankOwner = config.logBlankPath || '__';

  return function getLogUpdates(action, payload, helpers) {
  
    const owners = action.owners || [blankOwner];
  
    return owners.reduce((acc, owner) => {
      
      const actionBasePath = action.logHidden ? hiddenPath : basePath;
      const logPath = `${actionBasePath}/${owner.path(payload)}/${createId()}/${action.id}`;

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
