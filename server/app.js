import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('WELCOME TO CURTAIN AND BLIND API VERSION ONE');
});

app.use('/users', userRoute);
app.listen(3000, () => {
  console.log('App is running on port 3000 .....');
});
