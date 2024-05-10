const express = require('express');
const renderMW = require('../middleware/renderMW.js');
const getPostsMW = require('../middleware/posts/getAllPostsMW.js');
const getPostByIdMW = require('../middleware/posts/getPostByIdMW.js');
const createPostMW = require('../middleware/posts/createPostMW.js');
const updatePostMW = require('../middleware/posts/updatePostMW.js');
const getCommentsByPostIdMW = require('../middleware/comments/getCommentsByPostId.js');
const getPostsByUserIdMW = require('../middleware/posts/getPostsByUserIdMW.js');
const getUserByIdMW = require('../middleware/users/getUserByIdMW.js');
const getUsersPostsMW = require('../middleware/posts/getUsersPostsMW.js');
const addFollowMW = require('../middleware/users/addFollowMW.js');
const authGuardMW = require('../middleware/authGuardMW.js');
const getCurrentUserMW = require('../middleware/users/getCurrentUserMW.js');
const deletePostByIdMW = require('../middleware/posts/deletePostByIdMW.js');
const createCommentMW = require('../middleware/comments/createCommentMW.js');

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

router.get('/', getCurrentUserMW(), getPostsMW(models), renderMW('index'));

router.get(
  '/follows',
  authGuardMW(),
  getPostsMW(models),
  getFollowsMW(models),
  renderMW('follows')
);

router.get(
  '/dashboard',
  authGuardMW(),
  getUsersPostsMW(models),
  renderMW('dashboard')
);

// Posts
router.get('/posts/create', authGuardMW(), renderMW('createPost'));
router.post('/posts/create', authGuardMW(), createPostMW(models));

router.get(
  '/posts/edit/:postId',
  authGuardMW(),
  getPostByIdMW(models),
  renderMW('editPost')
);
router.post(
  '/posts/edit/:postId',
  authGuardMW(),
  getPostByIdMW(models),
  updatePostMW(models)
);

router.post('/posts/delete/:postId', authGuardMW(), deletePostByIdMW(models));

router.get(
  '/posts/:postId',
  getCurrentUserMW(),
  getPostByIdMW(models),
  getCommentsByPostIdMW(models),
  renderMW('post')
);

router.post(
  '/posts/:postId/comments',
  authGuardMW(),
  getPostByIdMW(models),
  createCommentMW(models)
);

router.get(
  '/users/:userId',
  getCurrentUserMW(),
  getUserByIdMW(models),
  getPostsByUserIdMW(models),
  renderMW('user')
);

router.get(
  '/follows/:userId',
  authGuardMW(),
  getUserByIdMW(models),
  addFollowMW(models),
  getFollowsMW(models),
  renderMW('follows')
);

module.exports = router;
