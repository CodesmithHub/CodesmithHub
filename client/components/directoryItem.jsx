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
        <li className="directory-item">
          <a href='#'>
            <img src={this.props.imgURL} alt={this.props.username + "'s pic"}
            onClick={() => { this.props.viewProfile(this.props.id); }} style={{height: 80, width: 80}}/>
          </a>
          <span>{this.props.username}</span>
        </li>
    );
  }
}

export default DirectoryItem;
