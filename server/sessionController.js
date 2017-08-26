// secret.js needs to export a string that is the 'secret' used in
// setJWT below.  Add to your `.gitignore` file so it is not pushed
// to GitHub.
const secret = require('./secret.js');
const jwt = require('jsonwebtoken');
const sessionController = {};


sessionController.setJWT = (request, response, next) => {
    let user = {
        firstname: request.body.firstname,
        email: request.body.email
    }
    let token = jwt.sign(user, secret, {expiresIn: 10000});
    response.cookie('token', token);
    next();
}

//TODO => finish session verification

sessionController.verifyJWT = (request, response, next) => {
    // console.log(request.cookies.token);
    next();
}




module.exports = sessionController;