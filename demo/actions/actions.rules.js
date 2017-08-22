/**
 * These are all WRITE rules.
 */

const paths = require('../paths/paths');

const userIdIsAuth = `newData.child('userId').val() == auth.uid`;
const postWasCreatedByUser = `root.child(\'${paths.postCreatedBy('$postId')}\').val() == auth.uid`;

module.exports = {
  __setup__: 'actions',

  createUser: userIdIsAuth,
  updateUserName: userIdIsAuth,
  updateUserEmail: userIdIsAuth,

  createPost: userIdIsAuth,
  removePost: postWasCreatedByUser,
  addTagToPost: postWasCreatedByUser,
  removeTagFromPost: postWasCreatedByUser
};
