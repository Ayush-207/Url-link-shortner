const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// API routes
router.post('/api/shorten', urlController.shortenUrl);
router.get('/api/analytics/:alias', urlController.getAnalytics);

// Redirect route (must be last)
router.get('/:alias', urlController.redirectUrl);

module.exports = router;
