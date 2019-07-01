import models from '../models';
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
      confirmPasswod
    } = req.body;
    const userDetails = {
      userName,
      email,
      password,
      confirmPasswod
    };
    const errors = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const userDetail in userDetails) {
      if (isEmpty(userDetails[userDetail])) {
        errors.push(`${userDetail} cannot be empty`);
      }
    }

    if (errors.length) {
      return res.status(400).send(errors);
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
      return res.status(400).send('Password must greater be greater than 5 character');
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
      return res.status(400).send('Passord must contain atleast one lower case character');
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
      return res.status(400).send('Passord must contain atleast one upper case character');
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
      return res.status(400).send('Passord must contain atleast an integer');
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
      return res.status(400).send(`${email} is not a vallid email format`);
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
    const { password, confirmPasswod } = req.body;
    if (password !== confirmPasswod) {
      return res.status(400).send('Passswords do not match');
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
      return res.status(400).send('Email already in use');
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
      return res.status(400).send('Username has been taken');
    }
    return next();
  }
}
