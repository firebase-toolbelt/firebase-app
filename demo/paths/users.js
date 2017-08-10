module.exports = {
  paths: {
    users: 'users',
    user: (userId) => `users/${userId}`
  },
  rules: {
    'users/$userId': {
      read: 'auth.uid == $userId',
      validate: "newDate.child('name').exists()"
    }
  }
};
