const Url = require('../models/Url');
const { generateAlias, validateUrl } = require('../utils/helpers');

class UrlService {
  async createShortUrl(originalUrl, customAlias = null) {
    // Validate URL
    if (!validateUrl(originalUrl)) {
      throw new Error('Invalid URL format');
    }

    // Handle custom alias or generate new one
    let alias = customAlias;
    
    if (customAlias) {
      // Check if custom alias is already taken
      const existing = await Url.findOne({ alias: customAlias });
      if (existing) {
        throw new Error('Custom alias already exists');
      }
      
      // Validate custom alias format
      if (!/^[a-zA-Z0-9_-]{3,20}$/.test(customAlias)) {
        throw new Error('Custom alias must be 3-20 characters (alphanumeric, underscore, hyphen only)');
      }
    } else {
      // Generate unique alias
      alias = await this.generateUniqueAlias();
    }

    // Create and save URL
    const url = new Url({
      originalUrl,
      alias
    });

    await url.save();
    return url;
  }

  async generateUniqueAlias() {
    let alias;
    let exists = true;
    let attempts = 0;
    const maxAttempts = 10;

    while (exists && attempts < maxAttempts) {
      alias = generateAlias();
      const url = await Url.findOne({ alias });
      exists = !!url;
      attempts++;
    }

    if (exists) {
      throw new Error('Failed to generate unique alias. Please try again.');
    }

    return alias;
  }

  async getUrlByAlias(alias) {
    const url = await Url.findOne({ alias });
    if (!url) {
      throw new Error('Short URL not found');
    }
    return url;
  }

  async getAnalytics(alias) {
    const url = await this.getUrlByAlias(alias);
    return {
      alias: url.alias,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      lastAccessed: url.lastAccessed
    };
  }

  async incrementClicks(alias) {
    const url = await this.getUrlByAlias(alias);
    await url.incrementClicks();
    return url.originalUrl;
  }
}

module.exports = new UrlService();
