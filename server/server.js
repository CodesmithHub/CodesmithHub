const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./../webpack.config.js');
const app = express();
const { Client } = require('pg');
// use connectionString to to connect to DB via CLI => psql connectionString
const connectionString = 'postgres://taviagze:xhNoQjlMqnEg86XbeWnAyTN-TEl_Dqyc@stampy.db.elephantsql.com:5432/taviagze';
// const connectionString = 'postgres://iqmprdbr:3UgEwulaY4Nyg5stt5WNpvQJ9f4czd19@pellefant.db.elephantsql.com:5432/iqmprdbr';
const pg = new Client({ connectionString });
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController.js');
const sessionController = require('./controllers/sessionController.js');
const authenticationRouter = require('./routers/authenticationRouter.js');
const messageController = require('./controllers/messageController.js')
const userRouter = require('./routers/userRouter.js');
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
app.use(bodyParser.json())
app.use(cookieParser())
app.get('/*', express.static(__dirname + './../www'))
//sessionController.verifyJWT
// all requests to /users get routed to middleware to hit additional sub routes
app.use('/user', sessionController.verifyJWT, userRouter.router,
  (request, response) => response.status(200).json(request.body.return));
// all requests to /authenticate get routed to middleware to hit additional sub routes
app.use('/authenticate', authenticationRouter.router,
  (request, response) => response.status(200).json(request.body.return));

// send bundle on all requests
app.post('/messages', sessionController.verifyJWT, messageController.postMessage)
app.get('/messages', messageController.getMessages)

// start server
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Codesmith Hub listening at http://%s:%s', host, port);
});
