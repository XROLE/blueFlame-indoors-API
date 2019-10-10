import express from 'express';
import Products from '../controllers/products';

// middlewares
import ValidateProduct from '../middleWares/validateProduct';

const router = express.Router();

router.route('/').get(Products.getProducts);
router.route('/').post(
  ValidateProduct.checkIsEmpty,
  Products.addProduct
);
router.route('/').patch((req, res) => res.send('I am a chosen one edit'));
router.route('/').delete((req, res) => res.send('I am a chosen one delete'));

export default router;
