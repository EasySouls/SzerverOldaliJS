const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const mongooseConnection = require('./db');
const router = require('./routes/index');
const authRouter = require('./routes/auth');
const MongoStore = require('connect-mongo');

const app = express();

app.set('view engine', 'ejs');
app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('static'));

// const sessionStore = new MongoStore({
//   client: mongooseConnection,
//   collectionName: 'sessions',
//   dbName: 'THSTAM',
// });

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/THSTAM',
    }),
  })
);

// Requires the passport config module, so the app knows about it
// and can use the passport middleware
const passport = require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', router);
app.use('/', authRouter);

// Any route that is not defined in the router will be handled here
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.stack);
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});
