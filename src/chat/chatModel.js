var mongoose = require('mongoose');
var Promise = require('bluebird');
var _ = require('underscore');

var MessageSchema = new mongoose.Schema({
  author: String,
  timestamp_created: {type:Date, default: Date.now},
  text: String
});


var ChatSchema = new mongoose.Schema({
  chatId: String,
  firstSender: String,
  // message: String,
  timestamp_created: {type:Date, default: Date.now},
  timestamp_updated: {type:Date, default: Date.now},
  participants: Array,
  messages: [MessageSchema],
  group: Boolean
});


// ChatSchema.statics

module.exports = mongoose.model('Chat', ChatSchema);

