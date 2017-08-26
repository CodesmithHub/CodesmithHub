const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./../webpack.config.js');
const app = express();
const { Client } = require('pg');
// use connectionString to to connect to DB via CLI => psql connectionString
const connectionString = 'postgres://taviagze:xhNoQjlMqnEg86XbeWnAyTN-TEl_Dqyc@stampy.db.elephantsql.com:5432/taviagze';
const pg = new Client({ connectionString: connectionString });
const userController = require('./controllers/userController.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sessionController = require('./controllers/sessionController.js');
const userRouter = require('./routers/userRouter.js');
const authenticationRouter = require('./routers/authenticationRouter.js');
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

// run request through parsers and verify session
app.use(bodyParser.json(), 
  cookieParser(),
  sessionController.verifyJWT);

// all requests to /users get routed to middleware to hit additional sub routes
app.use('/user', userRouter.router, 
  (request, response) => response.status(200).json(request.body.return));

// all requests to /authenticate get routed to middleware to hit additional sub routes
app.use('/authenticate', authenticationRouter.router,
  (request, response) => response.status(200).json(request.body.return));

// send bundle on all requests
app.get('/*', express.static(__dirname + './../www'))

// start server
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Codesmith Hub listening at http://%s:%s', host, port);
});