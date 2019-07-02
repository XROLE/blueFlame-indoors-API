import bcrypt from 'bcrypt';

/**
 * Convert password into hash code
 *
 * @param {string} passwordToHash - User password to hash
 *
 * @returns {string} - Already hashed password
 */
export const hashPassword = (passwordToHash) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(passwordToHash, salt);
};

/**
 * Compare hashed password with inputed password
 *
 * @param {string} password - inputed password
 * @param {string} hashedPassword - hashed password from db
 *
 * @returns {boolean} - True if hashed password matches with inputed password
 */
export const comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);
