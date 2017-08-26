const express = require('express');
const userController = require('./../controllers/userController.js');
const sessionController = require('./../controllers/sessionController.js');

const authenticationRouter = {};

authenticationRouter.router = express.Router();

// create user in DB and begin session
authenticationRouter.router.post('/create', userController.createUser, sessionController.setJWT);
// verify login credentials and start session
authenticationRouter.router.post('/validate', userController.verifyUser, sessionController.setJWT);


module.exports = authenticationRouter;