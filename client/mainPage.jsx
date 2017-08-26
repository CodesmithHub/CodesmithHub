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
  render() {
    let feed;

    // DIRECTORY
    if (this.props.selectedPage === 'Directory') {
      feed = <Directory listItems={this.props.directory} />;
    }

    // PROFILE PAGE
    else if (this.props.selectedPage === 'Profile') {
      console.log('--> directory');
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

    // NEWS FEED
    else if (this.props.selectedPage === 'Feed') {
      console.log('--> feed');
      feed = <NewsFeed feedItems={this.props.feedItems} />;
    }

    return (
      <div className="main-page">
        <h1> MAIN </h1>

        {/* profile pic / chat */}
        <div className="list-group col-sm-2">
          <img className="prof-pic" src={this.props.imgURL} onClick={()=> {this.props.changeView('Profile')}} />
          <TextField action={this.props.updateStatus} />
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
