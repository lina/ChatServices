var Chat = require('./chatModel');
var _ = require('underscore');
var userChatsController = require('../userChats/userChatsController')
var UserChats = require('../userChats/userChatsModel');


module.exports = {

  // createConversation: function()

  writeMessageToDatabase: function(messageData) {
    Chat.conversation.findOne({ chatId: messageData.conversationId })
    .then(function(conversation) {
      console.log("we're writing message to database, yay!");
      console.log('messageData', messageData);
      var messageParticipants;
      if(messageData.messageParticipants) {
        messageParticipants = Object.keys(messageData.messageParticipants);
      } else {
        messageParticipants = [];
        console.log('no message participants defined, messageParticipants:', messageParticipants);
      }

      console.log('------------>conversationId', messageData.conversationId)
      userChatsController.socketAddNewPrivChat(messageData.conversationId, messageParticipants);

      console.log('should be true (is it Array? inside chatController):', Array.isArray(messageParticipants));
      if(messageData) {
        var newMessage = new Chat.message();
        newMessage.senderID = messageData.senderId;
        newMessage.timestamp_created = messageData.messageTime;
        newMessage.text = messageData.message;
        newMessage.conversationID = messageData.conversationId;
        newMessage.messageParticipants = messageParticipants;
        newMessage.save(function(err) {
          if(err) {
            var response = {err: 'Unable to save message'};
            console.log(response.err);
            console.log('err:', err);
          } else {
            console.log('new message is saved in schema');
          }
        });
      } else {
        console.log('message Data is void............');
      }
      if(conversation) {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% conversation exists in database, adding message to conversation");
        conversation.timestamp_updated = messageData.messageTime;
        newMessage.messageParticipants = messageParticipants;
        conversation.messages.push(newMessage);
        if(messageParticipants.length > 2) {conversation.group = true} else {
          conversation.group = false;
        }
        conversation.save(function(err) {
          if(err) {
            var response = {error: 'Unable to save chat'};
            console.log(response.error);
            console.log('err', err);
            // res.status(500).json(response);

          } else {
            console.log('added new message in conversation');
            // res.status(201).send();
          }
        });

      } else {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% conversation didn't exist before, adding conversation to database")
        var conversation = new Chat.conversation();
        conversation.chatId = messageData.conversationId;
        conversation.firstSender = messageData.senderId;
        conversation.timestamp_updated = messageData.messageTime;
        conversation.participants = messageParticipants;
        conversation.messages.push(newMessage);
        if(messageParticipants.length > 2) {conversation.group = true} else {
          conversation.group = false;
        }
        conversation.save(function(err) {
          if(err) {
            var response = {error: 'Unable to save chat'};
            console.log(response.error);
            console.log('err', err);
            // res.status(500).json(response);

          } else {
            console.log('added new message in conversation');
            // res.status(201).send();
          }
        });
      }
    })
  },

  getChatDetails: function(req, res, next) {
    console.log('inside getChatDetails function');
    console.log('------------------------------------>req.body',req.body);
    console.log('-----------------------------end of req.body--------------------- ')
    var userChats = req.body.chatIDs;
    console.log('---------------->userChats', userChats);
    if(!userChats) {
      res.sendStatus(400);
      return;
    }

    var allConversations = [];
    for (var i = 0 ; i < userChats.length; i++) {
      var currChatId = userChats[i];
      console.log('---------------->currChatId', currChatId);
      Chat.conversation.findOne({chatId: currChatId})
      .then(function(conversation) {
        console.log('---------------->conversation', conversation);
        if(conversation) {
          allConversations.push(conversation);
        }
        if(allConversations.length === userChats.length) {
          res.status(200).send(allConversations); 
        }
      }.bind(this)).catch(function(err) {
        res.status(500).send(err);
        next(err);
      })
    }


    // Chat.conversation.findOne({'chatId': { $in: chatIDs}})
    // .then(function(chatDetails) {
    //   if(chatDetails) {
    //     res.status(200).send(chatDetails);
    //     next(chatDetails);
    //   } 
    // }.bind(this)).catch(function(err) {
    //   res.status(500).send(err);
    //   next(err);
    // });



    // Chat.find({}, function(err, userChats) {

    // })
    // for (var)
  },
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