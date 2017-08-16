/**
 * These are all READ rules.
 */

export default {
  __setup__: 'owners',

  user: 'auth.uid == $userId',
  post: 'auth.uid != null'

};
