import models from '../models';

import { comparePassword, isEmpty } from '../helpers';

const { User } = models;
let user = [];

/**
 * @class
 */
export default class validateUserLogin {
   /**
   * Check if user details are empty
   * @module middleware
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware
   *
   * @returns {undefined}
   */
  static checkIsEmpty(req, res, next) {
    const {
      email,
      password,
    } = req.body;
    const userDetails = {
      email,
      password,
    };
    const errors = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const userDetail in userDetails) {
      if (userDetails[userDetail] == undefined) {
        errors.push(`${userDetail} is required`);
      } else if (isEmpty(userDetails[userDetail])) {
        errors.push(`${userDetail} cannot be empty`);
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
   * Check if user exist in the database
   * @module middleware
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware
   *
   * @returns {undefined}
   */
  static async checkUserExist(req, res, next) {
    try {
      const { email } = req.body;
      user = await User.findAll({ where: { email } });
      if (!user[0]) {
        const errorMessage = `User ${email} does not exist`;
        return res.status(404).send({'error': errorMessage});
      }

      return next();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Check if user inputed password matches with the hashed password from database
   *
   * @param {Object} req - Express requst object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware
   *
   * @returns {undefined}
   */
  static async comparePassword(req, res, next) {
    try {
      const { password } = req.body;
      const { password: hashedPassword } = user[0].dataValues;

      if (!comparePassword(password, hashedPassword)) {
        return res.status(400).send({'error': 'Invalid password'});
      }
    } catch (error) {
      console.log(error);
    }

    return next();
  }
}
