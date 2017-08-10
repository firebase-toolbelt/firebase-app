module.exports = {
  updateUserName: {
    actionOwners: ['user'],
    validate: ['userName'],
    rules: `$userId == auth.uid`,
    updates: (data, paths) => ({
      [paths.user(data.userId)]: data.userName
    })
  }
}
