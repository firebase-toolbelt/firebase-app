module.exports = function buildExecuteAction(config, getActionUpdates) {
  
  if (!config.firebase) return null;

  const firebaseRef = config.firebase.database().ref();
  
  return function executeAction(action, payload) {
    return getActionUpdates(action, payload).then(({ updates }) => {
      
      config.onGetUpdates && config.onGetUpdates(updates);
      
      return firebaseRef.update(updates);
    });
  };
}
