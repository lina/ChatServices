var userChatsController = require('./userChatsController');

// console.log('userChatsController inside userChatsRoutes', userChatsController);

module.exports = function(router){
  // router.post('/', chatController.createChat);

  // router.post('/', chatController.sendMessage);

  // router.get('/:chatId', chatController.getChat);

  router.post('/addPrivChat', userChatsController.addNewPrivChat);

  router.post('/addNewPubChat', userChatsController.addNewPubChat);

  router.post('/getAllUserChats', userChatsController.getAllUserChats);

};
