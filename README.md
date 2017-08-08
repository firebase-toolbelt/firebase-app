# Firebase App

Firebase is awesome and it's really easy to setup a small app using it.
However, when building a complex application using solely firebase as it's backend a lot of caveats appear.
This module make this easier by allowing a modular approach that solves a lot of this problems.

We do this by following this pattern of code structuring:

- All your firebase **paths** are defined and read/validate rules are attached to them.

```javascript
// ./paths/users

module.exports = {
  paths: {
    users: 'users',
    user: (userId) => `users/${userId}`
  },
  rules: {
    `users/$userId`: {
      read: 'auth.uid == $userId',
      validate: 'newDate.child('name').exists()'
    }
  }
};
```

- All your firebase updates are defined as **actions**,
  these actions holds the logic for each update,
  they may validate the data client-side before sending it to firebase,
  they hold the server-side rules for applying these updates,
  they specify the **action owners** that automatically receives these actions logs,
  they may omit parts of the action from being logged for sensitive information or large updates,
  they may mark the log as hidden to facilitate meaningful logs lists.

```javascript
// ./actions/users

module.exports = {
  updateUserName: {
    actionOwners: ['user'],
    validate: ['userName'],
    rules: `$userId == auth.uid`,
    updates: (data, paths) => ({
      [paths.user(data.userId)]: data.userName
    })
  }
}
```

- You can test, mock and apply these actions easily.
  This way you can even mimick your firebase-app usage offline,
  by triggering actions on a simple object, watching them change your mocked firebase data,
  and even testing your app's security rules.
  
```javascript

// this object can be used as argument to the FirebaseRef.update() function.
const updates = getActionUpdate('updateUserName', { userId: '123', userName: 'new user name' })

// it can be applied locally
const db = applyActionUpdates(updates, {})

// or directly applied to firebase
executeActionUpdate('updateUserName', { userId: '123', userName: 'new user name' })
```

We use firebase-rules for dealing with our rules creating.
And targaryen for all our rules testing.
