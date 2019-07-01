import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secrete = process.env.JWT_SECRETE;
/**
 * Creates Json Web Token
 *
 * @param {Object} payload - The information to be encoded
 *
 * @returns {string} - Token
 */
const createToken = (payload) => {
  const token = jwt.sign(payload, secrete, { expiresIn: '24h' });
  return token;
};

export default createToken;
