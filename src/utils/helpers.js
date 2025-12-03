const validator = require('validator');
const { customAlphabet } = require('nanoid');

// Custom alphabet for URL-safe characters
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

/**
 * Generate a random 6-character alias
 * @returns {string} Random alias
 */
function generateAlias() {
  return nanoid();
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
function validateUrl(url) {
  return validator.isURL(url, {
    protocols: ['http', 'https'],
    require_protocol: true
  });
}

/**
 * Sanitize custom alias
 * @param {string} alias - Alias to sanitize
 * @returns {string} Sanitized alias
 */
function sanitizeAlias(alias) {
  return alias.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
}

module.exports = {
  generateAlias,
  validateUrl,
  sanitizeAlias
};
