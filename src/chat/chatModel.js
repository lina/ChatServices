var mongoose = require('mongoose');
var Promise = require('bluebird');
var _ = require('underscore');

var MessageSchema = new mongoose.Schema({
  conversationID: String,
  senderID: String,
  timestamp_created: String,
  text: String,
  messageParticipants: Array
});


var ConversationSchema = new mongoose.Schema({
  chatId: String,
  firstSender: String,
  timestamp_created: {type:Date, default: Date.now},
  timestamp_updated: String,
  participants: Array,
  messages: [MessageSchema],  
  group: Boolean
});

var message = mongoose.model('Message', MessageSchema, 'messages');
var conversation = mongoose.model('Conversation', ConversationSchema, 'conversations');

module.exports={
  message: message,
  conversation: conversation
};
