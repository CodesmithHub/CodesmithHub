import React, { Component } from 'react';
import Directory from './directory.jsx';
import ProfilePage from './profile.jsx';
import Button from './button.jsx';
import TextField from './textField.jsx';
import NewsFeed from './newsFeed.jsx';
import Navbar from './navbar.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import ChatBox from './chatbox.jsx'

/**
 * Main will render the main page when a user logs in
 *  this page should display the profile picture, a data feed, and a navigation bar
 *  the nav bar will toggle between user posts, calendar, and a directory
 *
 * Props: imgURL, selectedPage,
 *
 * profile pic will navigate to personal profile page
 */

class MainPage extends Component {

  state = {
    directory: [],
    selectedPage: 'Login',
    user: {},
    selectedUser: {},
  };

  changeView = (buttonName) => {
    console.log(`---> ${buttonName}`);
    this.setState({ selectedPage: buttonName });
  }

  changeTag = (e) => {
    const tag = e.target.innerHTML.split('--')[2].slice(1,-2)
    this.setState({
     selectedPage: tag
    })
    console.log('Current tag swapped to: ', tag)
  }

  /** this updates the directory, the server response from a GET request is passed in */
  updateDirectory = (newDirectory) => {
    this.setState({ directory: newDirectory });
  }

  setID = (userID) => {
    this.setState({ user: userID });
  }

  setUser = (userID) => {
    let userToSet;
    for (let i = 0; i < this.state.directory.length; i += 1) {
      const user2 = this.state.directory[i];
      if (user2.id === userID) {
        userToSet = user2;
        console.log('CURRENT USER: ', userToSet);
      }
    }
    this.setState({ user: userToSet });
  }

  viewProfile = (userID) => {
    let selectedUser;
    for (let i = 0; i < this.state.directory.length; i += 1) {
      const user2 = this.state.directory[i];
      if (user2.id === userID) {
        selectedUser = user2;
        console.log('SELECTED USER: ', selectedUser);
      }
    }
    selectedUser.username = selectedUser.firstname + ' ' + selectedUser.lastname;
    this.setState({ selectedPage: 'ViewPage', selectedUser: selectedUser });
  }

  componentDidMount() {
    this.setState({ selectedPage: 'Feed', user: this.props.location.state.from });

    axios.get('/user/all')
    .then((response) => {
      this.setState({
        directory: response.data,

      })
      this.updateDirectory(response.data);
      this.setUser(this.state.user);
    })
    .catch(() => {
      console.log('GET ERROR');
    });
  }

  /** Render the main page based on 'selectedPage' */
  render() {
    let feed;
    // DIRECTORY
    if (this.state.selectedPage === 'Directory') {
      console.log('STATE');
      console.log(this.state);
      feed = (<Directory
      listItems={this.state.directory}
      viewProfile={this.viewProfile}
      />);
    }

    // SEE YOUR PROFILE PAGE
    else if (this.state.selectedPage === 'Profile') {
        feed = (<ProfilePage
        username={this.state.user.username}
        hometown={this.state.user.hometown}
        past={this.state.user.past}
        future={this.state.user.future}
        hobbies={this.state.user.hobbies}
        random={this.state.user.random}
      />);
    }

    // VIEW A PROFILE PAGE
    else if (this.state.selectedPage === 'ViewPage') {
      feed = (
        <ProfilePage
          username={this.state.selectedUser.username}
          hometown={this.state.selectedUser.hometown}
          past={this.state.selectedUser.past}
          future={this.state.selectedUser.future}
          hobbies={this.state.selectedUser.hobbies}
          random={this.state.selectedUser.random}
          id={this.state.selectedUser.id}
        />
      );
    }

    // NEWS FEED
    else if (this.state.selectedPage === 'Feed') {
      feed = <NewsFeed directory={this.state.directory}/>;
    }

    else {
      console.log('ERROR: Shouldn\'t be here');
    }

    return (
      <div className="main-page">
        <h1> MAIN </h1>
        <div className="list-group col-sm-2">
          <img
            className="prof-pic"
            src="https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/438/codesmith_logo.png"
            onClick={() => { this.changeView('Profile'); }}
          />
          <TextField userID={this.state.user.id} />
          <ChatBox user={this.state.user.firstname}/>
        </div>

        {/* main window */}
        <div className="col-sm-10 col-sm-offset-2">
          {/* nav bar */}
          <div className="nav-bar">
            <MuiThemeProvider>
              <Navbar action={this.changeTag} />
            </MuiThemeProvider>
          </div>

          {/* Feed Items */}
          {feed}

        </div>
      </div>
    );
  }
}

export default MainPage;
