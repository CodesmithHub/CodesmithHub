const express = require('express');
const userController = require('./../controllers/userController.js');
const sessionController = require('./../controllers/sessionController.js');

const userRouter = {};

userRouter.router = express.Router();

// grab list of all users
userRouter.router.get('/all', userController.grabUsers);
// grab list of all posts
userRouter.router.get('/allposts', userController.allPosts);
// grab list of all posts for a given user
userRouter.router.post('/posts', userController.grabPosts);
// add post to database for a given user
userRouter.router.post('/addpost', userController.addPost);

userRouter.router.patch('/all/:id', userController.editUser);

module.exports = userRouter;
