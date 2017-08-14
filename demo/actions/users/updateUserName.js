const paths = require('../../paths');
const userPath = paths.users.paths;

module.exports = {
  updateUserName: {
    actionOwners: ['user'],
    validate: ['userName'],
    updates: (data) => ({
      [userPath.user(data.userId)]: data.userName
    })
  }
}
