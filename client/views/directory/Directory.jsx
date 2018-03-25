import React from 'react';
import DirectoryItem from './components/directoryItem';

/**
 * Directory will return a page containing a link to all users pages
 *
 * Props: array of users
 *  user array should contain the following data about each user:
 *    1. username
 *    2. imgURL - link to profile img
 *    3. pageURL  - link to profile page
 * 
 * TODO:  1. add a link to user pages,
 *        2. add a link to img URLs
 */

class Directory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { directory: props.directory };
  }

  render() {
    // let listItems = this.props.directory;
    const viewProfile = this.props.viewProfile;

    const cohortList = [];

    for (let i = 0; i < this.state.directory.length; i += 1) {
      cohortList.push(
        <DirectoryItem
          username={`${this.state.directory[i].firstname}  ${this.props.directory[i].lastname}`}
          imgURL="https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/438/codesmith_logo.png"
          viewProfile={viewProfile}
          key={i}
          id={this.props.directory[i].id}
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
