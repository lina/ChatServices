var mongoose = require('mongoose');
var Promise = require('bluebird');
var _ = require('underscore');

var ChatSchema = new mongoose.Schema({
  author: String,
  participant: String,
  message: String,
  created: {type:Date, default: Date.now}
})

module.exports = mongoose.model('Chat', ChatSchema);