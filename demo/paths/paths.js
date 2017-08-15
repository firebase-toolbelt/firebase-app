module.exports = {
  
  users: 'users',
  user: (userId) => `users/${userId}`,
  userName: (userId) => `users/${userId}/name`,
  userEmail: (userId) => `users/${userId}/name`,
  
  posts: 'posts',
  post: (postId) => `posts/${postId}`,
  postTitle: (postId) => `posts/${postId}/title`,
  postBody: (postId) => `posts/${postId}/body`,

  postTags: (postId) => `postTags/${postId}`,
  postTag: (postId, tagId) => `postTags/${postId}/${tagId}`,
  tagPosts: (tagId) => `tagPosts/${tagId}`,
  tagPost: (tagId, postId) => `tagPosts/${tagId}/${postId}`,

  userPosts: (userId) => `userPosts/${userId}`,

};
