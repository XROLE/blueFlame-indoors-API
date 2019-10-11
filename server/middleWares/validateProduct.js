import { isProductAvailable } from '../helpers/isProductAvailable';
import isCategory from '../helpers/categoryChecker';
import {
  isEmpty,
  isUUID
} from '../helpers/validator';

/**
 * @class
 */
export default class ValidateProduct {
  /**
   * Check if any of the product field is empty
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {Function} next - Express next middleware
   *
   * @returns {undefined}
   */
  static checkIsEmpty(req, res, next) {
    const {
      category, name, description, quantity, price, image, slide
    } = req.body;

    const fieldsToSave = {
      category, name, description, quantity, price, image, slide
    };
    const errors = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const field in fieldsToSave) {
      if (isEmpty(fieldsToSave[field])) {
        errors.push(`${field} field cannot be empty`);
      }
    }

    if (errors.length) {
      const error = new Error(...errors);
      error.status = 400;
      return next(error);
    }

    return next();
  }

  /**
   * Validates id
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {Function} next - Express next middleware
   *
   * @returns {undefined}
   */
  static checkId(req, res, next) {
    const { id } = req.params;
    if (!isUUID(id)) {
      const error = new Error(`${id} is not a valid uuid format`);
      error.status = 400;
      return next(error);
    }
    return next();
  }

  /**
   * Allows only registered categories
   * @param {object} req - The request object
   * @param {object} res - The response objet
   * @param {Function} next - Express next middleware
   *
   * @returns {undefined}
   */
  static checkCategory(req, res, next) {
    let { category } = req.body;
    if (!category) {
      // eslint-disable-next-line prefer-destructuring
      category = req.params.category;
    }
    if (!isCategory(category)) {
      const error = new Error(`${category} is not a valid category type`);
      error.status = 400;
      return next(error);
    }

    return next();
  }

  /**
   * Check if product exist
   *
   * @param {object} req - The request object
   * @param {object} res - the response object
   * @param {Function} next - Express next middleware
   *
   * @returns {undefined}
   */
  static async doProductExist(req, res, next) {
    const { id } = req.params;
    const product = await isProductAvailable(id);

    if (!product) {
      const error = new Error('Sorry, product does not exist');
      error.status = 400;
      return next(error);
    }
    return next();
  }
}
