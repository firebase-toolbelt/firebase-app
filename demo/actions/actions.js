const paths = require('../paths/paths');

module.exports = {

  createUser: {
    id: 'createUser',
    log: ['user'],
    validate: ['name', 'email'],
    updates: (payload) => ({
      [paths.user(payload.userId)]: {
        name: payload.name,
        email: payload.email
      }
    })
  },

  updateUserName: {
    id: 'updateUserName',
    log: ['user'],
    validate: ['value'],
    updates: (payload) => ({
      [paths.userName(payload.userId)]: payload.value
    })
  },

  updateUserEmail: {
    log: ['user'],
    validate: ['value'],
    updates: (payload) => ({
      [paths.userEmail(payload.userId)]: payload.value
    })
  },
  
  createPost: {
    id: 'createPost',
    log: ['user', 'post'],
    create: 'postId',
    validate: ['title', 'body'],
    updates: (payload, helpers) => ({
      [paths.post(payload.postId)]: {
        title: payload.title,
        body: payload.body,
        createdAt: helpers.now,
        createdBy: payload.userId
      }
    })
  },

  removePost: {
    id: 'removePost',
    log: ['user', 'post'],
    updates: (payload) => ({
      [paths.post(payload.postId)]: null
    })
  },

  addTagToPost: {
    id: 'addTagToPost',
    log: ['post'],
    validate: ['tagId'],
    updates: (payload) => ({
      [paths.postTag(payload.postId, payload.tagId)]: true,
      [paths.tagPost(payload.tagId, payload.postId)]: true
    })
  },

  removeTagFromPost: {
    id: 'removeTagFromPost',
    log: ['post'],
    validate: ['tagId'],
    updates: (payload) => ({
      [paths.postTag(payload.postId, payload.tagId)]: null,
      [paths.tagPost(payload.tagId, payload.postId)]: null
    })
  }

};
