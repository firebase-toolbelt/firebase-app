module.exports = {
  outputs: ['client', 'server'], // universal
  logOwners: ['task', 'user'],
  logIgnore: ['picture'],
  rules: false,
  updates: (payload, options) => {
    return {
      [`users/${payload.userId}`]: true
    };
  }
};
