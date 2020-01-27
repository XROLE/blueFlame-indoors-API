import express from 'express';
import multer from 'multer';

import Products from '../controllers/products';

// middlewares
import ValidateProduct from '../middleWares/validateProduct';

const upload = multer({ dest: 'uploads/' });

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
  upload.single('image'),
  ValidateProduct.checkIsEmpty,
  ValidateProduct.checkCategory,
  Products.addProduct
);

router.route('/:id').delete(
  ValidateProduct.checkId,
  ValidateProduct.doProductExist,
  Products.deleteProduct
);

router.route('/:id').patch(
  ValidateProduct.checkId,
  ValidateProduct.doProductExist,
  ValidateProduct.checkIsEmpty,
  ValidateProduct.checkCategory,
  Products.editProduct,
);
export default router;
