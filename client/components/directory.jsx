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
 * 
 * TODO:  1. add a link to user pages,
 *        2. add a link to img URLs
 */

class Directory extends Component {


  /** Get a list of user's when directory is clicked */
  componentDidMount() {
    axios.get('/user/all')
    .then((response) => {
      this.props.updateDirectory(response.data);
    })
    .catch(() => {
      console.log('GET ERROR');
    });
  }

  render() {

    // DIRECTORY

    // let listItems = this.props.directory;
    let viewProfile = this.props.viewProfile;
    
    let cohortList = [];

    for (let i = 0; i < this.props.listItems.length; i++) {
      cohortList.push(
        <DirectoryItem
          username={this.props.listItems[i].firstname + '  ' + this.props.listItems[i].lastname}
          imgURL='https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/438/codesmith_logo.png'
          viewProfile={viewProfile}
          key={i}
          id={this.props.listItems[i].id}
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
