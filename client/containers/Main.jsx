import React from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Directory from './../directory.jsx';
import ProfilePage from './../profile.jsx';
import TextField from './../textField.jsx';
import NewsFeed from './../newsFeed.jsx';

/**
 * Main will render the main page when a user logs in
 *  this page should display the profile picture, a data feed, and a navigation bar
 *  the nav bar will toggle between user posts, calendar, and a directory
 *
 * Props: imgURL, selectedPage,
 *
 * profile pic will navigate to personal profile page
 */

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('CONSTRUCTING MAIN');
    console.log(this);
    this.state = {
      directory: [],
      user: this.props.user,
      selectedUser: {},
    };
    this.viewProfile = this.viewProfile.bind(this);
  }


  componentDidMount() {
    axios.get('/user/all')
      .then((response) => {
        this.setState({ directory: response.data });
      })
      .catch(() => {
        console.log('GET ERROR');
      });
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
    selectedUser.username = `${selectedUser.firstname} ${selectedUser.lastname}`;
    console.log(`---> ${selectedUser.username}`);

    this.setState({ selectedUser });
  }

  /** Render the main page based on 'selectedPage' */
  render() {
    return (
      <main className="main-page">
        <Switch>
          <Route
            exact path="/"
            render={() => (
              <NewsFeed
                userId={this.props.feedItems}
              />
            )}
          />
          <Route
            exact path="/directory"
            render={() => (
              <Directory
                listItems={this.props.directory}
                viewProfile={this.viewProfile}
              />
            )}
          />
          <Route
            exact path="/profile"
            render={() => (
              <ProfilePage
                username={this.props.selectedUser.username}
                hometown={this.props.selectedUser.hometown}
                past={this.props.selectedUser.past}
                future={this.props.selectedUser.future}
                hobbies={this.props.selectedUser.hobbies}
                random={this.props.selectedUser.random}
                imgURL={this.props.selectedUser.imgURL}
                id={this.props.selectedUser.id}
              />
            )}
          />
        </Switch>
      </main>
    );
  }
}


export default MainPage;