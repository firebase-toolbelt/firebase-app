<a align="center" href="https://keeptasking.com"><img width="100%" src="https://image.ibb.co/d88XEQ/Firebase_App.png" alt="Firebase Toolbelt" border="0" /></a>

> A framework for creating secure and mantainable Firebase backed applications.

Firebase is awesome and it's really easy to setup a small app using it.
However, when building a complex application using solely firebase as it's backend a lot of caveats appear.
**Firebase-app** is a set of utilities that are used to solve a lot of this problems.

This module provides tools so you can:

- define and access your app's data paths
- define, execute and test your app's actions (even offline)
- validate your actions both client and server side
- create your firebase server side security rules using javascript
- check your server side rules coverage for your actions
- automatically create logs for your actions

What we don't provide:

- Any custom way to read your database. If you are using react we strongly recommend that you check out our other project, [firebase-sync](https://github.com/tasking/firebase-sync).

Although you can use this utilities however you like, we believe that by following the recommended code structure you will also gain a lot of productivity when building and mantaining your firebase-backed application.

## Getting started

One of the most basic things when working with firebase is creating your application structure.
Accessing the data paths may get messy really quickly.

The first thing you have to do is **define your paths**, so you always access them through these objects instead of manually writing them.

```javascript
const paths = {
  
  users: `users`,
  user: (userId) => `users/${userId}`,
  userName: (userId) => `users/${userId}/name`,
  userEmail: (userId) => `users/${userId}/email`,
  
  posts: `posts`,
  userPosts: (userId) => `posts/${userId}`
  
};
```

The second most basic thing is writing on this paths. Sometimes to several of them simultaneously.
You should **define your actions**, sou you will always access these updates in the same way throughout your application.

```javascript
const updateUserName = {
  id: 'updateUserName',
  updates: (payload) => ({
    [paths.userName(payload.userId)]: payload.value
  })
};
```

You may want to create **client side validations** so your actions always holds the payload you expect them to. We use [validate-properties](https://github.com/tasking/validate-properties) internally to check this validations.

```javascript
const createUser = {
  id: 'createUser',
  validate: ['name', 'email'],
  updates: (payload) => ({
    [paths.user(payload.userId)]: {
      name: payload.name,
      email: payload.email
    }
  })
};
```

Firebase does not create logs of your actions. Well... we do.
It's actually really easy to store logs using firebase-app. You just have to add **log owners** to your actions.
This is totally optional. If you want to skip it, be my guest.

```javascript
const updateUserEmail = {
  id: 'updateUserEmail',
  log: ['user'],
  updates: (payload) => ({
    [paths.userEmail(payload.userId)]: payload.value
  })
};
```

After you create your actions you just have to execute them passing in actual data.

```javascript
executeAction(updateUserEmail, { value: 'user@email.com' })
```

You can test these actions easily since we also provide ways to get their values instead of directly applying them to firebase.

```javascript
// this returns an object with updates that can be passed to FirebaseRef.update.
// in fact, that is exactly what the `executeAction` helper does.
const updates = getActionUpdates(updateUserName, { userName: 'new user name' })

// you can also apply this updates locally instead of passing them to the database.
// this way you can mock all your application's changes. even offline.
const mockedDatabase = applyActionUpdates(updates, {})
```

## Next steps

We also provide tools so you can create your firebase security rules and test their coverage on your created actions.
Internally we use both [firebase-rules](https://github.com/tasking/firebase-rules) and [targaryen](https://github.com/goldibex/targaryen) to build and test your rules.
