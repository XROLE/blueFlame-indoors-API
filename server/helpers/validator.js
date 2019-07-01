
/**
 *  Validates Email
 *
 * @param {string} email - The email to be validated
 *
 * @returns {boolean} - returns true if the emial is valid and vice versa
 */
export const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line max-len
  return regEx.test(String(email).toLowerCase());
};

/**
 * Checks is there is a duplicate string in an array of strings
 *
 * @param {array} arr - The array to check in
 * @param {string} stringToCheck - The string to check against
 *
 * @returns {string} - Returns string if duplicate exist otherwise returns null
 */
export const isDuplicate = (arr, stringToCheck) => arr.find(element => element === stringToCheck);

/**
 * Validate length
 *
 * @param {string} string - String to check length
 * @param {number} length - Mininum lenght to allow
 *
 * @returns {boolean} - return true if string length is equal or greater than specified length
 */
export const checkLength = (string, length) => string.length >= length;


/**
 * Check for lower case characters in a string
 *
 * @param {string} stringToCheck -The string to check
 *d
 * @returns {boolean} - True if the string contains letters
 */
export const containLowercase = stringToCheck => (/^(?=.*[a-z])/).test(String(stringToCheck));

/**
 *  Check for upper case character
 *
 * @param {string} stringToCheck - The string to check
 *
 *  @returns {boolean} - True if the string contains letters
 */
export const containUppercase = stringToCheck => (/^(?=.*[A-Z])/).test(String(stringToCheck));

/**
 *  Check for number in a string
 *
 * @param {string} stringToCheck - The string to check
 *
 *  @returns {boolean} - True if the string contains letters
 */
export const containNumber = stringToCheck => (/^(?=.*[0-9])/).test(String(stringToCheck));

/**
 * Check if string is empty
 *
 * @param {string} string - String
 *
 * @returns {boolean} - True if string is empty
 */
export const isEmpty = string => string.trim() === '';
