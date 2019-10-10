import { isEmpty } from '../helpers';

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
}
