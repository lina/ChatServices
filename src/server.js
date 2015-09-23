var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var chatController = require('./chat/chatController');
var userChatsController = require('./userChats/userChatsController');


///////////////////////////////////////
// socket connection with MobileFacade
///////////////////////////////////////
io.on('connection', function (socket) {
  console.log('connected to socket')
  socket.emit('testing1', { hello: 'world' });
  socket.on('testing2', function (data) {
    console.log('socket.on "testing2"');
    console.log(data);
  });


  socket.on('clicked on facebook', function() {
    console.log('user pressed on facebook');
    socket.emit('facebook listener');
  });

  socket.on('save message to database', function(data) {
    console.log('inside "socket.on "save message to database""');
    console.log('received data to write to database, data:', data);
    chatController.writeMessageToDatabase(data);
  });

  socket.on('create new conversation in database', function(conversationData) {
    console.log('inside socket.on "create new conversation in database"');
    chatController.createConversation(conversationData);
  });

  socket.on('add participant to conversation', function(messageData) {
    console.log('inside socket.on "add participant to conversation"');
    chatController.addedParticipant(messageData);
  });

  socket.on('add public chat to participant storage', function(chatID, participatingUsers) {
    console.log('add public chat to participant storage .on socket');
    for (var i = 0 ; i < participatingUsers.length; i++) {
      userChatsController.addPublicChatforUser(chatID, participatingUsers[i]);
    }
  })


});




//////////////////////////////////
// connect w/ db
//////////////////////////////////
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/chatservices');

var chatRouter = express.Router();
var userChatsRouter = express.Router();


//////////////////////////////////
// use middleware and hook up routes
//////////////////////////////////
// var chatRouter = express.Router();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/chat', chatRouter);
app.use('/api/userChats', userChatsRouter);

require('./chat/chatRoutes')(chatRouter);
require('./userChats/userChatsRoutes')(userChatsRouter);


// TODO, set up error logging middleware
// app.use(helpers.errorLogger);
// app.use(helpers.errorHandler);

// require('./chat/chatRoutes')(chatRouter);


//////////////////////////////////
// start server
//////////////////////////////////
var server = http.listen(process.env.PORT || 3003, function (){
  console.log('ChatServices listening on', server.address().address, server.address().port);
});

module.exports = app;

