import React, { Component } from 'react';

/**
 * component will return a page with an image and text
 *
 * Props: username, img url, bio questions[5]
 *
 */
class ProfilePage extends Component {

  // {/* src={this.props.imgURL} */}

  render() {
    return (
      <div className="profile-page">
        <img
          className="profile-pic"
          alt="profile pic"
          src='https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/438/codesmith_logo.png'
        />
        <h1 className="username">{this.props.username}</h1>
        <div className="questions">
          <h4 className="question">Where do you consider yourself from?</h4>
          <p>{this.props.hometown}</p>
          <h4 className="question">What were you doing before Codesmith?</h4>
          <p>{this.props.past}</p>
          <h4 className="question">What do you want to do with your coding skills?</h4>
          <p>{this.props.future}</p>
          <h4 className="question">What are your passions and hobbies?</h4>
          <p>{this.props.hobbies}</p>
          <h4 className="question">What is a fun or random fact about yourself?</h4>
          <p>{this.props.random}</p>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
