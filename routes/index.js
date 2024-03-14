const express = require('express');
const renderMW = require('../middleware/renderMW.js');
const getPostsMW = require('../middleware/posts/getAllPostsMW.js');
const getPostByIdMW = require('../middleware/posts/getPostByIdMW.js');
const createPostMW = require('../middleware/posts/createPostMW.js');

const PostModel = require('../models/post.js');
const UserModel = require('../models/user.js');
const CommentModel = require('../models/comment.js');

const router = express.Router();

const models = {
  Post: PostModel,
  User: UserModel,
  Comment: CommentModel,
};

router.get('/', getPostsMW(models), renderMW('index'));

router.get('/follows', renderMW('follows'));

router.get('/dashboard', renderMW('dashboard'));

router.get('/login', renderMW('login'));
router.get('/signup', renderMW('signup'));

router.get('/posts/create', renderMW('createPost'));
router.post('/posts/create', createPostMW(models));
router.get('/posts/edit/:id', getPostByIdMW(models), renderMW('editPost'));
router.get('/posts/:id', getPostByIdMW(models), renderMW('post'));

module.exports = router;
