module.exports = {
  paths: {
    workspaces: 'workspaces',
    user: (workspaceId) => `workspaces/${workspaceId}`
  },
  rules: {
    'workspaces/$workspaceId': {
      read: 'auth.uid != null',
      validate: "newDate.child('name').exists()"
    }
  }
};
