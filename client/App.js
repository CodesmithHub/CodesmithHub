import React from 'react';
import MainPage from './mainPage.jsx';
import LogIn from './login.js';
import SignUp from './signup.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      directory: [],
      selectedPage: 'Login',
      feedItems: [],
      user: {},
      selectedUser: {},
    };
    this.changeView = this.changeView.bind(this);
    this.updateDirectory = this.updateDirectory.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setID = this.setID.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
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

  /** Get the news feed from the database */
  fetchPosts() {
    console.log('Fetching posts...');
    axios.post('/feedposts')
    .then((response) => {
      console.log(resonse);
    })
    .catch((err) => {
      console.log(`ERROR: ${err}`);
    });
  }

  /** make a post to the news feed */
  makePost() {
    console.log('making post...');

    axios.post('/newpost', data)
    .then(() => {

    })
    .catch((err) => {
      console.log(`ERROR: ${err}`);
    });
  }

  render() {    
    console.log('rendering');
    // CONDITIONAL RENDERING
    let page;
    if (this.state.selectedPage === 'Login') {
      page = <LogIn changeView={this.changeView} setID={this.setID} />;
    }

    else if (this.state.selectedPage === 'SignUp') {
      page = <SignUp changeView={this.changeView} setID={this.setID} />;
    }

    else {
      page = (<MainPage
        user={this.state.user}
        selectedPage={this.state.selectedPage}
        directory={this.state.directory}
        feedItems={this.state.feedItems}
        changeView={this.changeView}
        updateDirectory={this.updateDirectory}
        viewProfile={this.viewProfile}
        selectedUser={this.state.selectedUser}
        setUser={this.setUser}
        setID={this.setID}
        fetchPosts={this.fetchPosts}
      />);
    }

    return (
      <div>
        Dis be da App
        {page}
      </div>
    );
  }
}

export default App
