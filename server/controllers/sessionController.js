// secret.js needs to export a string that is the 'secret' used in
// setJWT below.  Add to your `.gitignore` file so it is not pushed
// to GitHub.
const secret = require('./../secret.js');
const jwt = require('jsonwebtoken');
const sessionController = {};


sessionController.setJWT = (request, response, next) => {
  let user = {
      firstname: request.body.firstname,
      email: request.body.email
  }
  let token = jwt.sign(user, secret, {expiresIn: 60});
  response.cookie('token', token);
  next();
}

//TODO => finish session verification

sessionController.verifyJWT = (request, response, next) => {
  jwt.verify(request.cookies.token, secret, (err, decoded) => {
    if (!decoded) {
      response.send(decoded)
    } else {
      next();
    }
  })
}




module.exports = sessionController;
