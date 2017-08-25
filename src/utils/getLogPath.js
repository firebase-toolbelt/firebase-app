const { LOG_PATH, LOG_HIDDEN_PATH, LOG_BLANK_PATH } = require('./constants');

module.exports = function buildGetLogPath(config, logOwners) {

  const basePath = config.logBasePath || LOG_PATH;
  const hiddenPath = config.logHiddenPath || LOG_HIDDEN_PATH;
  const blankOwner = config.logBlankPath || LOG_BLANK_PATH;

  return function getLogPath(payload, _ownerId, logId, isHidden, payloadIsPath) {
    
    const ownerId = _ownerId || blankOwner;
    const owner = logOwners[ownerId];

    const ownerPath = payloadIsPath ? payload : owner.path(payload);
    const logBasePath = isHidden ? hiddenPath : basePath;
    const logOwnerPath = `${logBasePath}/${ownerId}/${ownerPath}`;

    return (logId) ? `${logOwnerPath}/${logId}` : logOwnerPath;

  };
}
