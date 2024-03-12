const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('static'));

// Routes
app.use('/', router);

// Any route that is not defined in the router will be handled here
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});
