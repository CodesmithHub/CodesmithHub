const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./../webpack.config.js');
const app = express();
const { Client } = require('pg');
const connectionString = 'postgres://taviagze:xhNoQjlMqnEg86XbeWnAyTN-TEl_Dqyc@stampy.db.elephantsql.com:5432/taviagze';
const pg = new Client({ connectionString: connectionString });
const userController = require('./userController.js');
const bodyParser = require('body-parser');

const compiler = webpack(webpackConfig);
 
app.use(express.static(__dirname + './../www'));
app.use(bodyParser.json());
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.post('/createuser', userController.createUser);

app.post('/login', userController.verifyUser);

app.get('/users', userController.grabUsers);

app.post('/feedposts', userController.grabPosts);

app.post('/newpost', userController.addPost);


 
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});