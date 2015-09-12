var Chat = require('./chatModel');
var _ = require('underscore');

module.exports = {
  sendMessage: function(req, res, next) {
    var messageData = req.body.messageData;

    if(!messageData) {
      console.log('messageData is undefined')
      res.sendStatus(400);
      return;
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