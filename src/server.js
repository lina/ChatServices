var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');

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
require('./userChats/userChatsRoutes')(chatRouter);


// TODO, set up error logging middleware
// app.use(helpers.errorLogger);
// app.use(helpers.errorHandler);

// require('./chat/chatRoutes')(chatRouter);


//////////////////////////////////
// start server
//////////////////////////////////
var server = app.listen(process.env.PORT || 3003, function (){
  console.log('ChatServices listening on', server.address().address, server.address().port);
});

module.exports = app;
