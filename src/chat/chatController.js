var Chat = require('./chatModel');
var _ = require('underscore');

module.exports = {

  // openPrivChat: function(req, res, next) {
  //   var chatData = req.body.chatData;
  //   console.log(chatData);
  //   if(!chatData) {
  //     console.log('chatData is undefined');
  //     res.sendStatus(400).json({error:"Bad Request"});
  //     return;
  //   } else {
  //     var chatId = req.body.chatId;
  //     var firstSender = req.body.firstSender;
  //     var participants = req.body.participants; //both names here

  //   }
  // },
  //create private chat and create public chat (separate)
  createGroupChat: function(req, res, next) {
    var chatData = req.body.chatData;
    console.log(chatData);
    if(!chatData) {
      console.log('chatData is undefined');
      res.sendStatus(400).json({error: "Bad Request"});
      return;
    } else {
      var chatId = req.body.firstSender + req.body.timestamp_created;
      var firstSender = req.body.firstSender;
      var timestamp_created = req.body.timestamp_created;
      var timestamp_updated = req.body.timestamp_updated; //
      var participants = req.body.participants;
      var messages = req.body.messages; //
      if(Array.isArray(participants) && participants.length > 1) {
        var group = true;
      } else {
        var group = false;
      }
    }


  },   

  sendMessage: function(req, res, next) {
    var messageData = req.body.messageData;

    if(!messageData) {
      console.log('messageData is undefined')
      res.sendStatus(400).json({error: "Bad Request"});
      return;
    } else {
      // var messageId = req.body.messageId;
      var author = req.body.author;
      var timestamp_created = req.body.timestamp_created;
      var message = req.body.message;

    }

    Chat.findOne({ messageId: messageData.id })
      .then(function(message) {
        console.log(' inside chatControllers sendMessage function')
        console.log('----------->message inside chatController', message)
        if(message) {
          res.status(200).send(user);
          next(user);
        } else {

        }
      })
  },

  getChat: function(req, res, next) {
    console.log('inside getMessage in chatController.js');
  }
};

// var ChatSchema = new mongoose.Schema({
//   messageId: String,
//   author: String,
//   message: String,
//   timestamp_created: {type:Date, default: Date.now},
//   timestamp_updated: {type:Date, default: Date.now},
//   participant: Array,
//   group: Boolean
// })