/**
 * Turns first letter of every word to Uppercase
 * @param {string} word - Word to capitalize
 *
 * @returns {string} - Capitalized word
 */
const capitalizeFirstLetter = (word) => {
  const splitStr = word.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};

export default capitalizeFirstLetter;
