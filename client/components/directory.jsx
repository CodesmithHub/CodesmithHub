import React, { Component } from 'react';
import DirectoryItem from './directoryItem.jsx';

class Directory extends Component {
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

    let viewProfile = this.props.viewProfile;

    let cohortList = [];

    for (let i = 0; i < this.props.listItems.length; i++) {
      cohortList.push(
        <DirectoryItem
          username={this.props.listItems[i].firstname + '  ' + this.props.listItems[i].lastname}
          imgURL={this.props.listItems[i].avatar || 'https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/438/codesmith_logo.png'}
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
