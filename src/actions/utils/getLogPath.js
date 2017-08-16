export default function buildGetLogPath(config, logOwners) {

  const basePath = config.logBasePath || '__log__';
  const hiddenPath = config.logHiddenPath || '__log_hidden__';
  const blankOwner = config.logBlankPath || '__';

  return function getLogPath(action, payload, _ownerId, logId, isHidden) {
    
    const ownerId = _ownerId || blankOwner;

    const owner = logOwners[ownerId];
    const logBasePath = isHidden ? hiddenPath : basePath;
    const logOwnerPath = `${logBasePath}/${ownerId}/${owner.path(payload)}`;

    return (logId) ? {
      actions: `${logOwnerPath}/actions/${logId}/${action.id}`,
      list: `${logOwnerPath}/items/${logId}`
    } : {
      actions: `${logOwnerPath}/actions/`,
      list: `${logOwnerPath}/items/`,
    };

  };
}
