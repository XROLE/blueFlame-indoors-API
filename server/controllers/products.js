import models from '../models';
import uploadToCloudinary from '../helpers/uploadToCloudinary';

const { Product } = models;

/**
 * @class
 */
class Products {
  /**
   * Represent get all products constructor
    * @constructor
    * @param {object} req - The request obect
    * @param {object} res - The response object
    *
    * @returns {object} - All products
    */
  static async getProducts(req, res) {
    try {
      const products = await Product.findAll();
      return res.send(products);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get single product from database
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @returns {object} - The product
   */
  static async getSingleProduct(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
    });

    return res.json({
      Success: true,
      Product: product.dataValues
    });
  }

  /**
   * Get products by category
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @returns {Array} - Array of products in thesame category
   */
  static async getProductByCategory(req, res) {
    const { category } = req.params;
    const product = await Product.findAll({ where: { category } });

    return res.json({
      Success: true,
      product,
    });
  }

  /**
   * Add product
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @returns {object} - The added product object
   */
  static async addProduct(req, res) {
    const {
      category, name, description, quantity, price, image, slide
    } = req.body;

    const imageUrl = uploadToCloudinary(image);
    console.log('I am a chosen one upload to cloud', imageUrl);

    const productToCreate = {
      category, name, description, quantity, price, image, slide
    };
    const savedProduct = await Product.create(productToCreate);
    return res.status(201).json({
      Message: `${name}, added succesfuly`,
      Product: savedProduct
    });
  }

  /**
   * Edit product controller
   * @param {object} req - The request object
   * @param {obect} res - The response object
   *
   * @returns {obect} - Newly edited product
   */
  static async editProduct(req, res) {
    try {
      const { id } = req.params;
      const {
        category, name, description, quantity, price, image, slide
      } = req.body;

      const productToEdit = await Product.findOne({ where: { id } });
      const editedProduct = await productToEdit.update({
        category, name, description, quantity, price, image, slide
      });

      return res.status(200).json({
        Success: true,
        Message: `${name} edited succesfuly`,
        editedProduct,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Delete a product by id
   *
   * @param {obect} req - The request object
   * @param {object} res - The response object
   *
   * @returns {string} - success message
   */
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const productToDelete = await Product.findOne({ where: { id } });
      await productToDelete.destroy();

      return res
        .status(200)
        .json({ Message: 'Product deleted succesfully' });
    } catch (error) {
      console.log(error);
    }
  }
}

export default Products;
