/**
 * Here we will mock our app's behaviours and rules without ever reaching for the server.
 */

const chai = require('chai');
const targaryen = require('targaryen/plugins/chai');
const getHelpers = require('../../src');
const { createUser, updateUserName } = require('../actions/actions');

const { expect } = chai;
const rules = targaryen.json.loadSync(__dirname + '/../database.rules.json');
chai.use(targaryen);

const {
  applyAction,
  getActionUpdates
} = getHelpers({
  owners: { 
    'user': 'userId' 
  }
});

describe('validateDatabase', () => {

  let db = {};

  before(function() {
    targaryen.setFirebaseRules(rules);
  });

  beforeEach(function() {
    targaryen.setFirebaseData(db);
  });

  it('should validate user creation', () => {

    const actionPayload = {
      name: '_name 1',
      email: '_email'
    };

    return applyAction(createUser, actionPayload).then(mockedDatabase => (
      db = Object.assign({}, mockedDatabase)
    )).then(() => (

      getActionUpdates(createUser, actionPayload).then(({ updates }) => {
        Object.keys(updates).forEach(actionPath => {
          expect({ uid: 'authUserId' }).can.write(updates[actionPath]).path(actionPath);    
        });
      })

    ));

  });

  it('should validate user name update', () => {

    const actionPayload = {
      userId: 3,
      value: '_name 2'
    };

    return applyAction(updateUserName, actionPayload).then(mockedDatabase => (
      db = Object.assign({}, mockedDatabase)
    )).then(() => (

      getActionUpdates(updateUserName, actionPayload).then(({ updates }) => {
        Object.keys(updates).forEach(actionPath => {
          expect({ uid: 'authUserId' }).can.write(updates[actionPath]).path(actionPath);    
        });
      })

    ));

  });

});
