import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import MainPage from './mainPage.jsx';
import LogIn from './login.js';
import SignUp from './signup.js';
import Directory from './directory.jsx';
import ProfilePage from './profile.jsx';
import NewsFeed from './newsFeed.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      directory: [],
      selectedPage: 'Login',
      user: {},
      selectedUser: {},
    };
    this.changeView = this.changeView.bind(this);
    this.updateDirectory = this.updateDirectory.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setID = this.setID.bind(this);
  }

  /**
   * Toggle between views based on the name property of a clickable element
   *
   * @param {string} buttonName
   */
  changeView(buttonName) {
    console.log(`---> ${buttonName}`);
    this.setState({ selectedPage: buttonName });
  }

  /** this updates the directory, the server response from a GET request is passed in */
  updateDirectory(newDirectory) {
    this.setState({ directory: newDirectory });
  }

  /** when the user logs in,
   * initally set the user to the userID
   * immediately call setUser() after this function
   *  */
  setID(userID) {
    console.log('setting userID');
    this.setState({ user: userID });
  }

  setUser(userID) {
    console.log('setting USER');
    let userToSet;
    // find userID in directory
    for (let i = 0; i < this.state.directory.length; i += 1) {
      const user2 = this.state.directory[i];
      if (user2.id === userID) {
        userToSet = user2;
        console.log(userToSet);
      }
    }
    userToSet.username = userToSet.firstname + ' ' + userToSet.lastname;

    this.setState({ user: userToSet });
  }

  /** go to profile page */
  viewProfile(userID) {
    let selectedUser;
    // find userID in directory
    for (let i = 0; i < this.state.directory.length; i += 1) {
      const user2 = this.state.directory[i];
      if (user2.id === userID) {
        selectedUser = user2;
        console.log(selectedUser);
      }
    }
    selectedUser.username = selectedUser.firstname + ' ' + selectedUser.lastname;
    console.log(`---> ${selectedUser.username}`);

    this.setState({ selectedPage: 'ViewPage', selectedUser: selectedUser });
  }

  render() {
    return (
      <div>Dis be da App
        <BrowserRouter>
          <div>
            <Route exact path='/' component={LogIn}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route path='/main' component={MainPage}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
