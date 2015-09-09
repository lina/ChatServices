var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
var http = require('http').Server(app);

var onlineUsers = {};

//////////////////////////////////
// connect w/ db
//////////////////////////////////
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/chatservices');

io.sockets.on('connection', function (socket) {
    console.log('socket connected');

    socket.on('user login', function(data) {
      console.log('socket.on user login')
    })

    socket.on('disconnect', function () {
        console.log('socket disconnected');
    });

    socket.emit('text', 'wow. such event. very real time.');
});

//////////////////////////////////
// use middleware and hook up routes
//////////////////////////////////
var chatRouter = express.Router();

app.use(cors());
// app.use(morgan('combined'));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/chat', chatRouter);

// TODO, set up error logging middleware
// app.use(helpers.errorLogger);
// app.use(helpers.errorHandler);

require('./chat/chatRoutes')(chatRouter);


//////////////////////////////////
// start server
//////////////////////////////////
var server = app.listen(process.env.PORT || 3003, function (){
  console.log('ChatServices listening on', server.address().address, server.address().port);
});

module.exports = app;
