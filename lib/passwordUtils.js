const crypto = require('crypto');

/**
 * @returns {boolean} - True if the password is valid, false otherwise
 */

function isValidPassword(password, hash, salt) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === hashVerify;
}

/**
 * @returns {object} - An object containing the salt and hash
 */
function generatePassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');

  return {
    salt: salt,
    hash: genHash,
  };
}

module.exports = { isValidPassword, generatePassword };
