var userChatsController = require('./userChatsController');

module.exports = function(router){
  // router.post('/', chatController.createChat);

  // router.post('/', chatController.sendMessage);

  // router.get('/:chatId', chatController.getChat);

  router.post('/addPrivChat', userChatsController.addNewPrivChat);

  router.post('/addNewPubChat', userChatsController.addNewPubChat);

  router.get('/getAllUserChats', userChatsController.getAllUserChats);

};
