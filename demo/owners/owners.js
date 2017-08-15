/**
 * These are equivalent.
 */

module.exports = {
  'user': 'userId',
  'post': {
    rules: '$postId',
    validate: ['postId'],
    path: (payload) => payload.postId
  }
};
