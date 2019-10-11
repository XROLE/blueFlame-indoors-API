import models from '../models';

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
