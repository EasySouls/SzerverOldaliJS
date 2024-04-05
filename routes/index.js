const express = require('express');
const renderMW = require('../middleware/renderMW.js');
const getPostsMW = require('../middleware/posts/getAllPostsMW.js');
const getPostByIdMW = require('../middleware/posts/getPostByIdMW.js');
const createPostMW = require('../middleware/posts/createPostMW.js');
const updatePostMW = require('../middleware/posts/updatePostMW.js');
const getCommentsByPostIdMW = require('../middleware/comments/getCommentsByPostId.js');
const getCommentsByPostsMW = require('../middleware/comments/getCommentsByPosts.js');
const getLoggedInUserMW = require('../middleware/users/getLoggedInUserMW.js');

const PostModel = require('../models/post.js');
const UserModel = require('../models/user.js');
const CommentModel = require('../models/comment.js');
const getFollowsMW = require('../middleware/users/getFollowsMW.js');

const router = express.Router();

const models = {
  Post: PostModel,
  User: UserModel,
  Comment: CommentModel,
};

router.get(
  '/',
  getPostsMW(models),
  // getCommentsByPostsMW(models),
  renderMW('index')
);

// TODO - add middleware to get follows
// TODO - add middleware to get posts by follows
router.get(
  '/follows',
  getPostsMW(models),
  getFollowsMW(models),
  renderMW('follows')
);

router.get(
  '/dashboard',
  getLoggedInUserMW(models), // TODO - retrieve user data from session
  getPostsMW(models), // TODO - Change this to getPostsByUserMW later
  renderMW('dashboard')
);

// Posts
router.get('/posts/create', renderMW('createPost'));
router.post('/posts/create', createPostMW(models));

// TODO - implement this when the auth is done, so only the author can edit the post
router.get('/posts/edit/:postId', getPostByIdMW(models), renderMW('editPost'));
router.post('posts/edit/:postId', getPostByIdMW(models), updatePostMW(models));

router.get(
  '/posts/:postId',
  getPostByIdMW(models),
  getCommentsByPostIdMW(models),
  renderMW('post')
);

module.exports = router;
