import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index.js';

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
