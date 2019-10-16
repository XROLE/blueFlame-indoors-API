import models from '../models';

// helpers
import {
  createToken,
  hashPassword,
  sendMail,
} from '../helpers';

const { User } = models;

/**
 *@class
*/
class Users {
  /**
   * Represent get User constructor
   * @constructor
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @returns {object} - Registered users
   */
  static async getUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.send(users);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *  Creates new user
   *
   * @param {object} req  - The request object
   * @param {object} res - The response object
   *
   * @returns {object} - Newly created user object
   */
  static async createUser(req, res) {
    const {
      userName, email, password
    } = req.body;
    const passwordToSave = hashPassword(password);
    const data = {
      userName, email, password: passwordToSave
    };

    await User.create(data);
    const token = createToken(data);

    return res.status(201).json({
      Message: 'Your account has been succesfully created',
      Token: token
    });
  }

  /**
   *  Login a user
   *
   * @param {object} req  - The request object
   * @param {object} res - The response object
   *
   * @returns {object} - User object
   */
  static async login(req, res) {
    const { email } = req.body;
    const user = await User.findAll({ where: { email } });

    const token = createToken(user[0].dataValues);
    return res.status(200).send({ token });
  }

  /**
   * Reset password controller
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @returns {object} Message - The satus fo the reset action
   */
  static async resetPassword(req, res) {
    try {
      const from = 'no_reply@blueflame-indoors.herokuapp.com';
      const subject = 'BFI reset password';
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      const { id } = user.dataValues;
      const message = `click to reset password localhost:3000/api/v1/users/reset/password/${id}`;

      await sendMail(email, from, subject, message);

      return res.json({
        Success: true,
        Message: 'Kindly log into your mail to complete the process'
      });
    } catch (error) {
      console.error(error.toString());
    }
  }

  /**
   * Handle password reset functionality
   * @param {object} req - The request object
   * @param {obect} res - The response object
   *
   * @returns {obect} - Newly edited product
   */
  static async resetPasswordConfirmed(req, res) {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const passwordToSave = hashPassword(password);
      const passwordToEdit = await User.findOne({ where: { id } });

      await passwordToEdit.update({ password: passwordToSave });

      const Token = createToken({ passwordToSave });

      return res.status(200).json({
        Success: true,
        Message: 'Password reset was succesfle',
        Token
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default Users;
