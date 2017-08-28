import React, { Component } from 'react';

/**
 * TextField -> when submitted, this should POST a message to the DB
 * and the update should show up in the news feed
 *
 */
class TextField extends Component {

  constructor() {
    super();
    this.newsPost = this.newsPost.bind(this);
  }

  render() {
    return (
      <div className="text-field">
        <input
          id="text-field"
          type="text"
          placeholder="Status.."
          onKeyUp={(event) => { this.newsPost(event); }}
        />
      </div>
    );
  }

    /**
   * Detect the enter key being pressed and appends a new feed item
   * Send userID and message
   * @param {e} event - keypress
   */
  newsPost(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      const data = {
        user_id: this.props.userID,
        post: document.getElementById('text-field').value,
      };

      console.log(`Posting the following: ${data.user_id}  ${data.post}`);

      axios.post('/user/addpost', data)
      .then((response) => {
        if (response.status === 200) {
          console.log('success!');
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(`ERROR: ${err}`);
      });
    }
  }
}

export default TextField;
