import models from '../models';

// helpers
import { createToken } from '../helpers';
import { hashPassword } from '../helpers';

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
    const users = await User.findAll();
    return res.send(users);
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
}

export default Users;
