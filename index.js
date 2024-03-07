import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.set('view engine', 'ejs');
app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/follows', (req, res) => {
  res.render('follows');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`);
});
