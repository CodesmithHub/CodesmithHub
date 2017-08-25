import React, { Component } from 'react';

/**
 * DirectoryItem will return a list item <li> containing details about each user
 *
 * Props: username, imgURL, pageURL, key
 */
class DirectoryItem extends Component {

  // TODO change href to this.props.pageURL

  render() {
    return (
      <div className="directory-item">
        <li>
          <a href='#'> <img src={this.props.imgURL} alt={this.props.username + "'s pic"} /></a>
          <span>{this.props.username}</span>
        </li>
      </div>
    );
  }
}

export default DirectoryItem;
