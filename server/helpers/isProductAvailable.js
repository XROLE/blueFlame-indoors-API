import models from '../models';

const { Product } = models;

/**
 * Method to check if product exist
 * @param {string} id - The product id
 *
 * @returns {array} - Array containing the available product
 */
// eslint-disable-next-line import/prefer-default-export
export const isProductAvailable = async (id) => {
  try {
    const availableProduct = await Product.findOne({
      where: { id },
    });

    return availableProduct;
  } catch (error) {
    const availableProduct = {};
    return availableProduct;
  }
};
