const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./../webpack.config.js');
const app = express();
const { Client } = require('pg');
const connectionString = 'postgres://taviagze:xhNoQjlMqnEg86XbeWnAyTN-TEl_Dqyc@stampy.db.elephantsql.com:5432/taviagze';
const pg = new Client({ connectionString: connectionString });
const userController = require('./userController.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sessionController = require('./sessionController.js');

const compiler = webpack(webpackConfig);
 
app.use(express.static(__dirname + './../www'));
app.use(bodyParser.json(),
  cookieParser(),
  sessionController.verifyJWT);
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

// create new user
app.post('/createuser', userController.createUser, sessionController.setJWT,
  (request, response) => response.status(200).json(request.body.return));

// verify login credentials
app.post('/login', userController.verifyUser, sessionController.setJWT,
  (request, response) => response.status(200).json(request.body.return));

// get all user data
app.get('/users', userController.grabUsers);

// get all activity posts for given user
app.post('/feedposts', userController.grabPosts);

// create new activity post for given user
app.post('/newpost', userController.addPost);

app.get('/allposts', userController.allPosts,
  (request, response) => response.status(200).json(request.body.return));



 
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});