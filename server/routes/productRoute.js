import express from 'express';
import Products from '../controllers/products';

// middlewares
import ValidateProduct from '../middleWares/validateProduct';

const router = express.Router();

router.route('/').get(Products.getProducts);

router.route('/:id').get(
  ValidateProduct.checkId,
  ValidateProduct.doProductExist,
  Products.getSingleProduct
);

router.route('/cate/:category').get(
  ValidateProduct.checkCategory,
  Products.getProductByCategory
);

router.route('/').post(
  ValidateProduct.checkIsEmpty,
  ValidateProduct.checkCategory,
  Products.addProduct
);

router.route('/:id').delete(
  ValidateProduct.checkId,
  ValidateProduct.doProductExist,
  Products.deleteProduct
);

router.route('/').patch((req, res) => res.send('I am a chosen one edit'));

export default router;
