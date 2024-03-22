const express = require('express');
const renderMW = require('../middleware/renderMW.js');
const getPostsMW = require('../middleware/posts/getAllPostsMW.js');
const getPostByIdMW = require('../middleware/posts/getPostByIdMW.js');
const createPostMW = require('../middleware/posts/createPostMW.js');
const updatePostMW = require('../middleware/posts/updatePostMW.js');
const getCommentsByPostIdMW = require('../middleware/comments/getCommentsByPostId.js');
const getCommentsByPostsMW = require('../middleware/comments/getCommentsByPosts.js');

const PostModel = require('../models/post.js');
const UserModel = require('../models/user.js');
const CommentModel = require('../models/comment.js');

const router = express.Router();

const models = {
  Post: PostModel,
  User: UserModel,
  Comment: CommentModel,
};

router.get(
  '/',
  getPostsMW(models),
  getCommentsByPostsMW(models),
  renderMW('index')
);

router.get('/follows', renderMW('follows'));

router.get('/dashboard', renderMW('dashboard'));

// Auth screens
router.get('/login', renderMW('login'));
router.get('/signup', renderMW('signup'));

// Posts
router.get('/posts/create', renderMW('createPost'));
router.post('/posts/create', createPostMW(models));

router.get('/posts/edit/:postId', getPostByIdMW(models), renderMW('editPost'));
router.post('posts/edit/:postId', getPostByIdMW(models), updatePostMW(models));

router.get(
  '/posts/:postId',
  getPostByIdMW(models),
  getCommentsByPostIdMW(models),
  renderMW('post')
);

module.exports = router;
