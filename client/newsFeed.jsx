import React, { Component } from 'react';
import FeedItems from './feedItem.jsx';

class NewsFeed extends Component {

  render() {
    let feedItems = [];
    for (let i = 0; i < this.props.feedItems.length; i += 1) {
      feedItems.push(
        <FeedItems
          username={this.props.feedItems[i].username} 
          message={this.props.feedItems[i].message}
          imgURL={this.props.feedItems[i].imgURL}
          key={i}
        />);
    }

    return (
      <div className="directory">
        <h1>NEWS FEED</h1>
        <ul className="news-feed">
          {feedItems}
        </ul>
      </div>
    );
  }
}

export default NewsFeed;
