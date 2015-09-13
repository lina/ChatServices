var mongoose = require('mongoose');
var Promise = require('bluebird');
var _ = require('underscore');

var ChatSchema = new mongoose.Schema({
  messageId: String,
  author: String,
  message: String,
  timestamp_created: {type:Date, default: Date.now},
  timestamp_updated: {type:Date, default: Date.now},
  participant: Array,
  group: Boolean
})

// ChatSchema.statics

module.exports = mongoose.model('Chat', ChatSchema);