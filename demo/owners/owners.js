/**
 * These are equivalent.
 */

module.exports = {
  'user': 'userId',
  'post': {
    rules: '$userId',
    validate: ['userId'],
    path: (payload) => payload.userId
  }
};
