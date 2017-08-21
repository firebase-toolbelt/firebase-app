/**
 * Here we will mock our app's behaviours and rules without ever reaching for the server.
 */

const expect = require('expect');
const getHelpers = require('../../src');
const { createUser, updateUserName } = require('../actions/actions');

describe('mockDatabase', () => {

  let db = {};

  const {
    applyAction
  } = getHelpers({
    owners: { 
      'user': 'userId' 
    }
  });

  it('should generate user updates object', () => {

    const actionPayload = {
      name: 'user name 1',
      email: 'user@email.com'
    };

    return applyAction(createUser, actionPayload).then(mockedDatabase => {

      db = Object.assign({}, mockedDatabase);

      expect(db).toInclude({
        users: [actionPayload]
      });
      expect(db).toIncludeKey('__log__');

    });

  });

  it('should update db with user updates object', () => {

    const actionPayload = {
      value: 'user name 2'
    };

    return applyAction(updateUserName, actionPayload).then(mockedDatabase => {

      db = Object.assign({}, db, mockedDatabase);

      expect(db.user).toInclude([{
        name: actionPayload.value 
      }]);

    });

  });

});
