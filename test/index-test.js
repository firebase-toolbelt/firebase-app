import expect from 'expect'
import getHelpers from 'src/index'

describe('getActionUpdates', () => {

  const {
    getActionUpdates,
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
      expect(updates).toContainKey(`users/${returnables.userId}`);
      expect(updates).toContainKey(`__log__/user/${returnables.userId}/${returnables['logId/user']}/createUser`);
      expect(returnables).toContainKey('userId');
    });
  });

});
