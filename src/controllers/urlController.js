const urlService = require('../services/urlService');

class UrlController {
  async shortenUrl(req, res) {
    try {
      const { originalUrl, customAlias } = req.body;

      if (!originalUrl) {
        return res.status(400).json({
          success: false,
          message: 'Original URL is required'
        });
      }

      const url = await urlService.createShortUrl(originalUrl, customAlias);
      const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

      res.status(201).json({
        success: true,
        data: {
          shortUrl: `${baseUrl}/${url.alias}`,
          originalUrl: url.originalUrl,
          alias: url.alias,
          createdAt: url.createdAt
        }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async redirectUrl(req, res) {
    try {
      const { alias } = req.params;
      const originalUrl = await urlService.incrementClicks(alias);
      res.redirect(originalUrl);
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async getAnalytics(req, res) {
    try {
      const { alias } = req.params;
      const analytics = await urlService.getAnalytics(alias);

      res.json({
        success: true,
        data: analytics
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new UrlController();
