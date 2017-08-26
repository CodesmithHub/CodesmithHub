import React, { Component } from 'react';
import Directory from './directory.jsx';
import ProfilePage from './profile.jsx';
import Button from './button.jsx';

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
    if (this.props.selectedPage === 'Directory') {
      feed = <Directory listItems={this.props.directory} />;
    }

    else if (this.props.selectedPage === 'Profile') {
      let user = this.props.directory[0];
      feed = (<ProfilePage
        username={user.username}
        hometown={user.hometown}
        past={user.past}
        future={user.future}
        hobbies={user.hobbies}
        random={user.random}
        imgURL={user.imgURL}
      />);
    }


    return (
      <div className="main-page">
        <h1> MAIN </h1>

        {/* profile pic / chat */}
        <div className="list-group col-sm-2">
          <img src={this.props.imgURL} onClick={()=> {this.props.changeView('Profile')}} />
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
