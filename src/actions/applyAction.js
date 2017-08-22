const setWith = require('lodash/setWith');

module.exports = function buildApplyAction(config, getActionUpdates) {
  
  return function applyAction(action, payload, target = {}) {
    return getActionUpdates(action, payload).then(({ updates }) => {
      
      config.onGetUpdates && config.onGetUpdates(updates);

      let newTarget = target;
      Object.keys(updates).forEach((path) => {
        newTarget = setWith(newTarget, path.split('/'), updates[path], Object);
      });

      return newTarget;

    });
  };

}
