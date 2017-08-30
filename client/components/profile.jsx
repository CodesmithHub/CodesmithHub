import React, { Component } from 'react';
import FeedItem from './feedItem.jsx';

class ProfilePage extends Component {

  state = {
    feedItems: [],
  }

  componentDidMount () {
    axios.post('/user/posts', { user_id: this.props.id })
      .then(res => {
        this.setState({
          feedItems: res.data
        })
      })
  }

  render() {
    const feed = [];

    this.state.feedItems.forEach((message, index) => {
      feed.push(
        (<FeedItem
          message={message.post}
          username={this.props.username}
          imgURL={this.props.avatar}
          key={index}
        />),
      );
    });

    return (
      <div className="profile-page">
        <img
          className="profile-pic"
          alt="profile pic"
          src={this.props.avatar}
        />
        <h1 className="username">{this.props.username}</h1>
        {feed}
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
        <button type='submit' onClick={this.handleClick}> Edit </button>
      </div>
    );
  }


}

export default ProfilePage;
