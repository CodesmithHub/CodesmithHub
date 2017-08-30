import React, { Component } from 'react';
import FeedItem from './feedItem.jsx';



class NewsFeed extends Component {

  state = {
    feedItems: [],
  }

  componentDidMount () {
    axios.get('/user/allposts')
      .then(res => {
        this.setState({
          feedItems: res.data
        })
      })
  }
  render() {
    const imgURL = 'https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/438/codesmith_logo.png';
    let feed = [];
    for (let i = 0; i < this.state.feedItems.length; i++) {
      for (let j = 0; j < this.props.directory.length; j++) {
        if (this.state.feedItems[i].id === this.props.directory[j].id) {
          feed.push(
            <FeedItem
              username={this.props.directory[j].firstname}
              message={this.state.feedItems[i].post}
              imgURL={imgURL}
              key={i}
            />
          )
        }
      }
    }

    return (
      <div className="directory">
        <h1 style={{textAlign: 'center'}}>NEWS FEED</h1>
        <ul className="news-feed">
          {feed}
        </ul>
      </div>
    );
  }
}

export default NewsFeed;
