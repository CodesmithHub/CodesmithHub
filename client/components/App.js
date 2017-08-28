import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import MainPage from './mainPage.jsx';
import LogIn from './../user/login.js';
import SignUp from './../user/signup.js';
import Directory from './directory.jsx';
import ProfilePage from './profile.jsx';
import NewsFeed from './newsFeed.jsx';

class App extends React.Component {


  render() {
    return (
      <div>Dis be da App
        <BrowserRouter>
          <div>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/main" component={MainPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
