import set from 'lodash/fp/set';

export default function buildApplyAction(config, getActionUpdates) {
  
  return function applyAction(action, payload, target = {}) {
    
    return getActionUpdates(action, payload).then(({ updates }) => {
      
      config.onGetUpdates && config.onGetUpdates(updates);

      let newTarget = target;
      Object.keys(updates).forEach((path) => {
        newTarget = set(path.split('/'), updates[path])(newTarget);
      });

      return newTarget;
    });
  };
}