const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('static'));

app.use('/', router);

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});
