var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var onlineUsers = {};

//////////////////////////////////
// connect w/ db
//////////////////////////////////
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/chatservices');


//////////////////////////////////
// use middleware and hook up routes
//////////////////////////////////
// var chatRouter = express.Router();

// app.use(cors());
// app.use(morgan('dev'));
// app.use(bodyParser.json());

// app.use('/api/chat', chatRouter);

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


io.on('connection', function (socket) {
    console.log('socket connected');
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log('should say world', data);
      });

    socket.on('user login', function(data) {
      console.log('socket.on user login')
    })

    socket.on('helloServer', function(data) {
      socket.emit('helloClient')
      console.log('client said hello to server');
    })

    socket.on('clicked on twitter', function() {
      console.log('user pressed on twitter');
      socket.emit('twitter listener');
    });

    socket.on('disconnect', function () {
      console.log('socket disconnected');
    });


    // socket.emit('text', 'wow. such event. very real time.');
});



module.exports = app;
