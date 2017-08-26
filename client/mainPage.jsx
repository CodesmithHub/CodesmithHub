import React, { Component } from 'react';
import Directory from './directory.jsx';
import ProfilePage from './profile.jsx';
import Button from './button.jsx';
import TextField from './textField.jsx';
import NewsFeed from './newsFeed.jsx';

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

  /** Get a list of user's when directory is clicked */
  componentDidMount() {
    this.props.fetchPosts();
    axios.get('/users')
    .then((response) => {
      this.props.updateDirectory(response.data);
      this.props.setUser(this.props.user);
    })
    .catch(() => {
      console.log('GET ERROR');
    });
  }

  render() {
    let feed;

    // DIRECTORY
    if (this.props.selectedPage === 'Directory') {
      feed = (<Directory
      listItems={this.props.directory}
      viewProfile={this.props.viewProfile}
      />);
    }

    // SEE YOUR PROFILE PAGE
    else if (this.props.selectedPage === 'Profile') {
      feed = (<ProfilePage
        username={this.props.user.username}
        hometown={this.props.user.hometown}
        past={this.props.user.past}
        future={this.props.user.future}
        hobbies={this.props.user.hobbies}
        random={this.props.user.random}
        imgURL={this.props.user.imgURL}
      />);
    }

    // VIEW A PROFILE PAGE
    else if (this.props.selectedPage === 'ViewPage') {

      feed = (
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
      );
    }

    // NEWS FEED
    else if (this.props.selectedPage === 'Feed') {
      console.log('FEED');
      // this.props.fetchPosts();
      console.log(this.props.feedItems);
      feed = <NewsFeed feedItems={this.props.feedItems} />;
    }

    else {
      console.log('props', this.props.selectedPage)
      console.log('what am i doing??')      
    }

    return (
      <div className="main-page">
        <h1> MAIN </h1>

        {/* src={this.props.user.imgURL} */}
        {/* profile pic / chat */}
        <div className="list-group col-sm-2">
          <img
            className="prof-pic"
            src="https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/438/codesmith_logo.png"
            onClick={() => { this.props.changeView('Profile'); }}
          />
          <TextField userID={this.props.user.id} />
          chat room goes here...
        </div>

        {/* main window */}
        <div className="col-sm-10 col-sm-offset-2">
          {/* nav bar */}
          <div className="nav-bar">
            <Button text="Feed" action={this.props.changeView} />
            <Button text="Calendar" action={this.props.changeView} />
            <Button text="Directory" action={this.props.changeView} />
          </div>

          {/* Feed Items */}
          {feed}
        </div>
      </div>
    );
  }
}

export default MainPage;
