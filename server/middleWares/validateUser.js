import models from '../models';
import { isUUID } from '../helpers/validator';
import {
  isDuplicate,
  isEmail,
  isEmpty,
  checkLength,
  containLowercase,
  containUppercase,
  containNumber
} from '../helpers';


const { User } = models;
let users = [];

/**
 * @class
 */
export default class ValidateUser {
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
      userName,
      email,
      password,
      confirmPassword
    } = req.body;
    const userDetails = {
      userName,
      email,
      password,
      confirmPassword
    };
    const errors = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const userDetail in userDetails) {
      if (isEmpty(userDetails[userDetail])) {
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
  static checkIsEmptyUpdatePassword(req, res, next) {
    const {
      password,
      confirmPassword
    } = req.body;
    const userDetails = {
      password,
      confirmPassword
    };
    const errors = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const userDetail in userDetails) {
      if (isEmpty(userDetails[userDetail])) {
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
  static checkIsEmptyResetPassword(req, res, next) {
    const { email } = req.body;
    const userDetails = { email };
    const errors = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const userDetail in userDetails) {
      if (isEmpty(userDetails[userDetail])) {
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
      const error = new Error('Unauthorize Access');
      error.status = 400;
      return next(error);
    }
    return next();
  }

  /**
   * Check minimum password length
   * @module middleware
   * @Function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express middleware function
   *
   * @returns {undefined}
   */
  static checkPasswordLength(req, res, next) {
    const { password } = req.body;
    if (!checkLength(password, 6)) {
      const error = new Error('Password must greater be greater than 5 character');
      error.status = 400;
      return next(error);
    }
    return next();
  }

  /**
   * Check for lower case
   * @module middleware
   * @Function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware
   *
   * @returns {undefined}
   */
  static checkLowerCase(req, res, next) {
    const { password } = req.body;
    if (!containLowercase(password)) {
      const error = new Error('Passord must contain atleast one lower case character');
      error.status = 400;
      return next(error);
    }

    return next();
  }

  /**
   * Check for Upper case
   * @module middleware
   * @Function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware
   *
   * @returns {undefined}
   */
  static checkUpperCase(req, res, next) {
    const { password } = req.body;
    if (!containUppercase(password)) {
      const error = new Error('Passord must contain atleast one upper case character');
      error.status = 400;
      return next(error);
    }

    return next();
  }

  /**
   * Check for number in password
   * @module middleware
   * @Function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware
   *
   * @returns {undefined}
   */
  static checkNumber(req, res, next) {
    const { password } = req.body;
    if (!containNumber(password)) {
      const error = new Error('Passord must contain atleast an integer');
      error.status = 400;
      return next(error);
    }

    return next();
  }

  /**
   * Checks for a valid email format
   * @module middleware
   * @Function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware
   *
   * @returns {undefined}
   */
  static checkMail(req, res, next) {
    const { email } = req.body;
    if (!isEmail(email)) {
      const error = new Error(`${email} is not a vallid email format`);
      error.status = 400;
      return next(error);
    }
    return next();
  }

  /**
   * Validate password match
   * @module middleware
   * @Function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware
   *
   * @returns {undefined}
   */
  static checkPassword(req, res, next) {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      const error = new Error('Passwords do not match');
      error.status = 400;
      return next(error);
    }
    return next();
  }

  /**
   *  Checks for duplicate emails
   * @module middleware
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   *
   * @returns {undefined}
   */
  static async checkDuplicatMail(req, res, next) {
    const { email } = req.body;
    users = await User.findAll();
    const emails = users.map(user => user.email);

    if (isDuplicate(emails, email)) {
      const error = new Error('Email already in use');
      error.status = 400;
      return next(error);
    }
    return next();
  }

  /**
  * Checks for duplicate username
  * @module middleware
  * @function
  *
  * @param {Object} req - Express request object
  * @param {Object} res - Express response object
  * @param {Object} next - Express next middleware
  *
  * @returns {undefined}
  */
  static async checkDuplicateUserName(req, res, next) {
    const { userName } = req.body;
    const userNames = users.map(user => user.userName);

    if (isDuplicate(userNames, userName)) {
      const error = new Error('Username has been taken');
      error.status = 400;
      return next(error);
    }
    return next();
  }

  /**
   *  Checks for duplicate emails
   * @module middleware
   * @function
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   *
   * @returns {undefined}
   */
  static async doUserExist(req, res, next) {
    const { email } = req.body;
    users = await User.findAll();
    const emails = users.map(user => user.email);

    if (!isDuplicate(emails, email)) {
      const error = new Error(`Sorry account with ${email} does not exist`);
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
  static async checkUserExistById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findAll({ where: { id } });
      if (!user[0]) {
        const error = new Error('Invalid user account');
        error.status = 404;
        return next(error);
      }

      return next();
    } catch (error) {
      console.log(error);
    }
  }
}
