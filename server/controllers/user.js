import models from '../models';

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
   */
  static async getUsers(req, res) {
    const users = await User.findAll();
    return res.send(users);
  }
}

export default Users;
