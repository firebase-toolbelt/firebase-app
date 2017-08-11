module.exports = {
  updateUserName: {
    actionOwners: ['user'],
    validate: ['userName'],
    updates: (data, paths) => ({
      [paths.user(data.userId)]: data.userName
    })
  }
}
