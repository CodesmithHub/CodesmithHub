import React, { Component } from 'react';

class FeedItem extends Component {

  render() {
    return (
      <li className="feed-item">
        <img src={this.props.imgURL} alt={this.props.username + "'s picture"} style={{ height: 75, width: 120}}/>
        <span>{this.props.username}: {this.props.message}</span>
      </li>
    );
  }
}

export default FeedItem;
