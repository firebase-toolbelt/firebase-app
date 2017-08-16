/**
 * These are all WRITE rules.
 */

import paths from '../paths/paths';

const userIdIsAuth = `newData.child('userId') == auth.uid`;
const postWasCreatedByUser = `root.child(${paths.postCreatedBy('$postId')}).val() == auth.uid`;

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
