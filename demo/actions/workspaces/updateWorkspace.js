module.exports = {
  updateWorkspace: {
    actionOwners: ['workspace', 'user'],
    validate: [],
    rules: `$userId == auth.uid`,
    updates: (data, paths) => ({
      [paths.user(data.userId)]: data.userName
    })
  }
}
