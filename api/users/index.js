/******** User Router ***********/

const userRouter = require('express').Router();
const userController = require('./users.controller');


userRouter.get('/', userController.getAll);
userRouter.get('/:username', userController.getUser);
userRouter.get('/:username/tweets', userController.getUserTweets);
userRouter.post('/', userController.createUser);
userRouter.delete('/:username' , userController.deleteUser);
userRouter.patch('/:username/:newname' ,userController.updateUser);

module.exports = userRouter;