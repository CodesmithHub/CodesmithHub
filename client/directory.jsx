import React, { Component } from 'react';
import DirectoryItem from './directoryItem.jsx';

/**
 * Directory will return a page containing a link to all users pages
 *
 * Props: array of users
 *  user array should contain the following data about each user:
 *    1. username
 *    2. imgURL - link to profile img
 *    3. pageURL  - link to profile page
 */

class Directory extends Component {

  render() {
    let cohortList = [];

    for (let i = 0; i < this.props.listItems.length; i++) {
      cohortList.push(
        <DirectoryItem
          username={this.props.listItems[i].username}
          imgURL={this.props.listItems[i].imgURL}
          pageURL={this.props.listItems[i].pageURL}
          key={i}
        />,
      );
    }

    return (
      <div className="directory">
        <h1>DIRECTORY</h1>
        <ul className="cohort-list">
          {cohortList}
        </ul>
      </div>
    );
  }
}

export default Directory;
