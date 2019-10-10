import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import notFoundRoute from './middleWares/notFound';
import errorHandler from './middleWares/errorHandler';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('WELCOME TO CURTAIN AND BLIND API VERSION ONE');
});

app.use('/api/v1/users', userRoute);
app.use('/api/v1/products', productRoute);

app.use(notFoundRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log('App is running on port 3000 .....');
});
