import React from 'react';
import axios from 'axios';
import FeedItem from '../.././feedItem';

/**
 * component will return a page with an image and text
 *
 * Props: username, img url, bio questions[5]
 * TODO: don't hard code the imgURL (profile image)
 */
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedItems: [],
    };
  }

  componentDidMount() {
  /**
  * GRABS all the posts from a specific user, by sending their userID
  */
    console.log(`requesting posts from: ${this.props.id}  ${this.props.username}`);

    axios.post('/user/posts', { user_id: this.props.id })
      .then((res) => {
        console.log('** recieved posts **');
        console.log(res.data);
        console.log('** **');

        this.setState({ feedItems: res.data });
        // this.state.feedItems = res.data;
      })
      .catch((err) => {
        console.log(`ERROR: ${err}`);
      });
  }


  render() {
    const imgURL = 'https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/438/codesmith_logo.png';
    // parse feed items
    const feed = [];

    this.state.feedItems.forEach((message, index) => {
      feed.push(
        (<FeedItem
          message={message.post}
          username={this.props.username}
          imgURL={imgURL}
          key={index}
        />),
      );
    });

    return (
      <div className="profile-page">
        <img
          className="profile-pic"
          alt="profile pic"
          src="https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/438/codesmith_logo.png"
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
      </div>
    );
  }
}

export default Profile;
