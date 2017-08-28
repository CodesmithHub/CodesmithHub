import React, { Component } from 'react';
import Directory from './directory.jsx';
import ProfilePage from './profile.jsx';
import Button from './button.jsx';
import TextField from './textField.jsx';
import NewsFeed from './newsFeed.jsx';
import { BrowserRouter, Route, Link } from 'react-router-dom';

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

  constructor() {
    super();
    console.log('CONSTRUCTING MAIN');
    console.log(this);
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
    console.log('setting: ', userToSet);
    // userToSet.username = userToSet.firstname + ' ' + userToSet.lastname;

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

  /** Get a list of user's when directory is clicked */
  componentDidMount() {
    this.setState({ selectedPage: 'Feed', user: this.props.location.state.from });

    axios.get('/user/all')
    .then((response) => {
      this.updateDirectory(response.data);
      this.setUser(this.state.user);

      // this.setUser(this.state.user);
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

      // console.log(this.state);
      // this.setUser(this.state.user);
      console.log('******** USER');
      console.log(this.state);
      console.log('********');
      

      feed = (<ProfilePage
        username={this.state.user.username}
        hometown={this.state.user.hometown}
        past={this.state.user.past}
        future={this.state.user.future}
        hobbies={this.state.user.hobbies}
        random={this.state.user.random}
        imgURL={this.state.user.imgURL}
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
          imgURL={this.state.selectedUser.imgURL}
          id={this.state.selectedUser.id}
        />
      );
    }

    // NEWS FEED
    else if (this.state.selectedPage === 'Feed') {
      feed = <NewsFeed feedItems={this.state.feedItems} />;
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
          chat room goes here...
        </div>

        {/* main window */}
        <div className="col-sm-10 col-sm-offset-2">
          {/* nav bar */}
          <div className="nav-bar">
            <Button text="Feed" action={this.changeView}>
              <Link to="/newsfeed">Feed</Link>
            </Button>
            <Button text="Calendar" action={this.changeView} />
            <Button text="Directory" action={this.changeView} />
          </div>

          {/* Feed Items */}
          {feed}

        </div>
      </div>
    );
  }
}

export default MainPage;