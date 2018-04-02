const tweetsRouter = require('express').Router();
const tweetsController = require('./tweets.controller');

tweetsRouter.get('/', tweetsController.getAll);
tweetsRouter.get('/:id',tweetsController.getTweetById)
tweetsRouter.post('/',tweetsController.createTweet);


module.exports = tweetsRouter;