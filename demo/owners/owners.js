/**
 * These are equivalent.
 */

export default {
  'user': 'userId',
  'post': {
    rules: '$postId',
    validate: ['postId'],
    path: (payload) => payload.postId
  }
};
