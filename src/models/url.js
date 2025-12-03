const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true
  },
  alias: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for faster lookups
urlSchema.index({ alias: 1 });
urlSchema.index({ createdAt: -1 });

// Method to increment clicks
urlSchema.methods.incrementClicks = async function() {
  this.clicks += 1;
  this.lastAccessed = new Date();
  return this.save();
};

module.exports = mongoose.model('Url', urlSchema);
