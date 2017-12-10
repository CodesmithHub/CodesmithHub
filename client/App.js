import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './mainPage.jsx';
import LogIn from './login.js';
import SignUp from './signup.js';
import Directory from './directory.jsx';
import ProfilePage from './profile.jsx';
import NewsFeed from './newsFeed.jsx';

const App = () => (
  <div>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/main" component={MainPage} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
