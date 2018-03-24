const jwt = require('jsonwebtoken');

const sessionController = {};


sessionController.setJWT = (request, response, next) => {
  const user = {
    firstname: request.body.firstname,
    email: request.body.email,
  };

  const token = jwt.sign(user, process.env.SECRET, { expiresIn: 10000 });
  response.cookie('token', token);
  next();
};

// TODO => finish session verification

sessionController.verifyJWT = (request, response, next) => {
  // console.log(request.cookies.token);
  next();
};


module.exports = sessionController;
