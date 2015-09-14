var chatController = require('./chatController');

module.exports = function(router){
  router.post('/createGroupChat', chatController.createGroupChat);

  router.post('/sendMessage', chatController.sendMessage);

  router.get('/:chatId', chatController.getChat);

  // router.post('/addPrivChat', userController.addNewPrivChat);

  // router.post('/addNewPubChat', userController.addNewPubChat);
  // router.get('/:fbId/fields/:fields', userController.getUserByFields);

};
