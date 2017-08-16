/**
 * These are all READ rules.
 */

module.exports = {
  __setup__: 'owners',

  user: 'auth.uid == $userId',
  post: 'auth.uid != null'

};
