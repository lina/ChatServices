var Chat = require('./chatModel');
var _ = require('underscore');

module.exports = {
  sendMessage: function(req, res, next) {
    var messageData = req.body.messageData;

    if(!messageData) {
      console.log('messageData is undefined')
      res.sendStatus(400).json({error: "Bad Request"});
      return;
    } else {
      var messageId = req.body.messageId;
      var author = req.body.author;
      var message = req.body.message;
      var timestamp_created: req.body.timestamp_created;
      var timestamp_updated: req.body.timestamp_updated;
      
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

  getMessage: function(req, res, next) {
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