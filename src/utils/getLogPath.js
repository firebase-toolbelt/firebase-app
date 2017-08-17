module.exports = function buildGetLogPath(config, logOwners) {

  const basePath = config.logBasePath || '__log__';
  const hiddenPath = config.logHiddenPath || '__log_hidden__';
  const blankOwner = config.logBlankPath || '__';

  return function getLogPath(payload, _ownerId, logId, isHidden, payloadIsPath) {
    
    const ownerId = _ownerId || blankOwner;
    const ownerPath = payloadIsPath ? payload : owner.path(payload);

    const owner = logOwners[ownerId];
    const logBasePath = isHidden ? hiddenPath : basePath;
    const logOwnerPath = `${logBasePath}/${ownerId}/${ownerPath}`;

    return (logId) ? `${logOwnerPath}/${logId}` : logOwnerPath;

  };
}
