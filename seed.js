const PostsModel = require('./models/post');
const UsersModel = require('./models/user');
const CommentsModel = require('./models/comment');
const mongoose = require('mongoose');
const { use } = require('passport');

function rand(max) {
  return Math.floor(Math.random() * max);
}

const mockUsers = [
  {
    username: 'Pista bácsi',
    usertag: 'pistabacsi',
    email: 'pistabacsi@gmail.com',
    createdAt: new Date(),
  },
  {
    username: 'Mari néni',
    usertag: 'marineni',
    email: 'marineni@gmail.com',
    createdAt: new Date(),
  },
  {
    username: 'János',
    usertag: 'janos',
    email: 'janos@gmail.com',
    createdAt: new Date(),
  },
  {
    username: 'Emperor Karl Franz',
    usertag: 'karl.franz',
    email: 'franz.emperor@sigmar.com',
    createdAt: new Date(),
  },
];

const mockPosts = [
  {
    title: 'First Post',
    body: 'This is the first post.',
    _author: '4c981ea0bb34d53f3e4eea3e',
    createdAt: new Date(),
  },
  {
    title: 'Second Post',
    body: 'This is the second post.',
    _author: '3216b37a262f8fba572201f1',
    createdAt: new Date(),
  },
  {
    title: 'Third Post',
    body: 'This is the third post.',
    _author: '4c981ea0bb34d53f3e4eea3e',
    createdAt: new Date(),
  },
  {
    title: 'Fourth Post',
    body: 'This is the fourth post.',
    _author: 4,
    createdAt: new Date(),
  },
  {
    title: 'Warhammer Post',
    body: 'This is a Warhammer-themed post.',
    _author: 1,
    createdAt: new Date(),
  },
  {
    title: 'Chaos Post',
    body: 'This is a Chaos-themed post.',
    _author: '3216b37a262f8fba572201f1',
    createdAt: new Date(),
  },
  {
    title: 'Imperium Post',
    body: 'This is an Imperium-themed post.',
    _author: 3,
    createdAt: new Date(),
  },
  {
    title: 'Ork Post',
    body: 'This is an Ork-themed post.',
    _author: 4,
    createdAt: new Date(),
  },
];

const mockComments = [
  {
    content: 'This is the first comment.',
    _author: 1,
    _post: 1,
    createdAt: new Date(),
  },
  {
    content: 'This is the second comment.',
    _author: 2,
    _post: 2,
    createdAt: new Date(),
  },
  {
    content: 'This is the third comment.',
    _author: 3,
    _post: 3,
    createdAt: new Date(),
  },
  {
    content: 'This is the fourth comment.',
    _author: 4,
    _post: 4,
    createdAt: new Date(),
  },
];

const seed = async () => {
  await mongoose.connect('mongodb://localhost/THSTAM');

  // Deletes any existing data
  await UsersModel.deleteMany({});
  await PostsModel.deleteMany({});
  await CommentsModel.deleteMany({});

  // Seeds the database with mock data
  const users = await UsersModel.insertMany(mockUsers);

  for (let i = 0; i < mockPosts.length; i++) {
    mockPosts[i]._author = users[rand(users.length)]._id;
  }

  const posts = await PostsModel.insertMany(mockPosts);

  for (let i = 0; i < mockComments.length; i++) {
    mockComments[i]._author = users[rand(users.length)]._id;
    mockComments[i]._post = posts[rand(posts.length)]._id;
  }

  await CommentsModel.insertMany(mockComments);

  await mongoose.disconnect();
};

seed();
