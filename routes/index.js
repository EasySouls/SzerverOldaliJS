const express = require('express');
const renderMW = require('../middleware/renderMW.js');
const getPostsMW = require('../middleware/posts/getAllPostsMW.js');

const PostModel = require('../models/post.js');
const UserModel = require('../models/user.js');

const router = express.Router();

router.get('/', getPostsMW(), renderMW('index'));

router.get('/follows', renderMW('follows'));

router.get('/dashboard', renderMW('dashboard'));

router.get('/posts/create', renderMW('createPost'));

module.exports = router;
