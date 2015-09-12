var chatController = require('./chatController');

module.exports = function(router){

  router.post('/', chatController.sendMessage);

  router.get('/:messageId', chatController.getMessage);

  // router.get('/:fbId/fields/:fields', userController.getUserByFields);

};
