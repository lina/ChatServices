var UserChats = require('./userChatsModel');
var _ = require('underscore');

// console.log('inside userChatsCotroller.js');

module.exports = {
  socketAddNewPrivChat: function(chatID, participantIDs) {
    console.log('ATTEMPTING TO ADD NEW PRIVATE CHAT!');
    console.log('chatID:', chatID);
    console.log('participantIDs:', participantIDs);
    if(chatID && participantIDs) {    
      if(participantIDs.length === 2) {
        var chatId = chatID;
        for (var i =0 ; i < participantIDs.length; i++) {
          var userId = participantIDs[i];
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% userId:', userId);
          UserChats.findOne({userId: userId}, function(err, model) {
            if(model) {
              console.log('model found when trying to add chatId, model:', model);
              for (var j = 0 ; j < participantIDs.length; j++) {
                // if(i !== j) {
                  var partnerId = participantIDs[j];
                  var tempObject = {};
                  tempObject[partnerId] = chatId;
                  model.chatId_private.push(tempObject);
                // }
              } // for loop
              for (var i = 0 ; i < model.chatId_all.length; i++) {
                if(model.chatId_all[i] === chatId) {
                  return;
                }
              }
              model.chatId_all.push(chatId);
              model.save(function(err) {
                if(err) {
                  var response = {error: 'Unable to save chat'};
                  // res.status(500).json(response);
                } else {
                  console.log('added chat details to user entry in db');
                  // res.status(201).send();
                }
              })
              console.log('user does exist');
              // res.status(201).send();
            } else {
              console.log("couldn't find userId in usermodel... something is wrong. check userController.js")
            } // if (model)
          }) // userChats.findOne   
        } // for loop
      }
    }
  },

  addNewPrivChat: function(req, res, next) {
    console.log('received request to add new private chat');
    if(!req.body) {
      return res.status(400).json({error:"Bad Request"});
    } else {
      var chatId = req.body.chatId;
      var partnerId = req.body.author;
      var userId = req.body.userId;
      UserChats.findOne({userId: userId}, function(err, model) {
        if(model) {
          console.log('model found when trying to add chatId, model:', model);
          model.chatId_private.push({partnerId: chatId})
          model.chatId_all.push(chatId);
          model.save(function(err) {
            if(err) {
              var response = {error: 'Unable to save chat'};
              res.status(500).json(response);
            } else {
              console.log('added chat details to user entry in db');
              res.status(201).send();
            }
          })
          console.log('user does exist');
          res.status(201).send();
        } else {
          console.log("couldn't find userId in usermodel... something is wrong. check userController.js")
        }
      })
    }
  },



  getAllUserChats: function(req, res, next) {
    console.log('inside getAllUserChats function');
    console.log('req.body.userId:', req.body.userId);

    var userId = req.body.userId;
    
    if(!userId) {
      res.sendStatus(400);
      return;
    }
    UserChats.findOne({ userId: userId })
      .then(function(user) {
        if(user){
          res.status(200).send(user);
          next(user);
        } else {
          var newUser = new UserChats();
          newUser.userId = userId;
          newUser.chatId_all = [];
          newUser.chatId_private = [];
          newUser.save().then(function(newUser) {
            res.status(201).send(newUser);
            next(newUser);
          });
        }
      }.bind(this)).catch(function(err) {
        res.status(500).send(err);
        next(err);
      });
  },

  addNewPrivChat: function(req, res, next) {
    console.log('received request to add new private chat');
    if(!req.body) {
      return res.status(400).json({error:"Bad Request"});
    } else {
      var chatId = req.body.chatId;
      var partnerId = req.body.author;
      var userId = req.body.userId;
      UserChats.findOne({userId: userId}, function(err, model) {
        if(model) {
          console.log('model found when trying to add chatId, model:', model);
          model.chatId_private.push({partnerId: chatId})
          model.chatId_all.push(chatId);
          model.save(function(err) {
            if(err) {
              var response = {error: 'Unable to save chat'};
              res.status(500).json(response);
            } else {
              console.log('added chat details to user entry in db');
              res.status(201).send();
            }
          })
          console.log('user does exist');
          res.status(201).send();
        } else {
          console.log("couldn't find userId in usermodel... something is wrong. check userController.js")
        }
      })
    }
  },

  addNewPubChat: function(req, res, next) {
    console.log('received request to add new public chat');
    if(!req.body) {
      return res.status(400).json({error:"Bad Request"});
    } else {
      var chadId = req.body.chatId;
      var userId = req.body.userId;
      UserChats.findOne({userId: userId}, function(err, model) {
        if(model) {
          console.log('model found when trying to add ChatId, model:', model);
          model.chatId_all.push(chatId);
          model.save(function(err) {
            if(err) {
              var response = {error:"Unable to save chat"};
              res.status(500).json(response);
            } else {
              console.log('added chat details to user entry in db');
              res.status(201).send();
            }
          })
          console.log('user exists and found');
          res.status(201).send();
        } else {
          console.log("couldn't find userId in usermodel... something is wrong. check userController.js")
        }
      })
    }
  }


};
