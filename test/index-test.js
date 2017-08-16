import expect from 'expect'
import getHelpers from 'src/index'

describe('getActionUpdates', () => {

  const {
    getActionUpdates,
    getLogPath,
    applyAction
  } = getHelpers({
    owners: {
      'user': 'userId',
      'post': 'postId'
    }
  });

  const createUser = {
    id: 'createUser',
    log: ['user'],
    create: 'userId',
    validate: ['name', 'email'],
    updates: ({ userId, name, email }) => ({
      [`users/${userId}`]: { name, email }
    })
  };
  
  it('should generate a valid updates object', () => {
    return getActionUpdates(createUser, {
      name: 'user name',
      email: 'user@email.com'
    }).then(({ updates, returnables }) => {

      const userId = returnables.userId;
      const logId = returnables['logId/user'];
      const logPath = getLogPath(createUser, { userId }, 'user', logId);

      expect(updates).toContainKey(`users/${returnables.userId}`);
      expect(updates).toContainKey(logPath.actions);
      expect(updates).toContainKey(logPath.list);
        
      expect(returnables).toContainKey('userId');
      expect(returnables).toContainKey('logId/user');

    });
  });

});
