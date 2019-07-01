
import jwt from 'jsonwebtoken';
/**
 * @Class
 */
export default class Token {
  /**
   * creates jwt token
   *
   * @param {object} payload - The user details
   *
   * @returns {string} Genrated token
   */
  static createToken(payload) {
    const token = jwt.sign(payload);
    return token;
  }
}
