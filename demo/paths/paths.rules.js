/**
 * These are all READ or VALIDATE rules.
 */

import paths from './paths';

export default {
  __setup__: 'paths',

  [paths.users]: 'auth.uid != null',

  [paths.user('$userId')]: {
    validate: `newData.hasChildren(['name', 'email'])`
  },
  [paths.userName('$userId')]: {
    validate: 'newData.isString()'
  },
  [paths.userEmail('$userId')]: {
    validate: 'newData.isString()'
  },

  [paths.posts]: 'auth.uid != null',

  [paths.post('$postId')]: {
    validate: `newData.hasChildren(['title', 'body', 'createdAt', 'createdBy'])`
  },
  [paths.postTitle('$postId')]: {
    validate: 'newData.isString()'
  },
  [paths.postBody('$postId')]: {
    validate: 'newData.isString()'
  },
  [paths.postCreatedAt('$postId')]: {
    validate: 'newData.val() == now'
  },
  [paths.postCreatedBy('$postId')]: {
    validate: 'newData.val() == auth.uid'
  },

  [paths.postTags]: 'auth.uid != null',
  [paths.tagPosts]: 'auth.uid != null',

  [paths.userPosts('$userId')]: 'auth.uid == $userId'

};
