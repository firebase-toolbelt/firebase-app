const { anyCondition } = require('firebase-rules/helpers/conditions');
const { LOG_PATH, LOG_HIDDEN_PATH } = require('../../utils/constants');

module.exports = function pathWriteRules(config) {
  const basePath = config.logBasePath || LOG_PATH;
  const hiddenPath = config.logHiddenPath || LOG_HIDDEN_PATH;
  return {
    '.write': anyCondition(
      `root.child(\'${basePath}\').val() !== newDataRoot().child(\'${basePath}\').val()`,
      `root.child(\'${hiddenPath}\').val() !== newDataRoot().child(\'${hiddenPath}\').val()`
    )
  };
};
