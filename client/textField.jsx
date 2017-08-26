import React, { Component } from 'react';

/**
 * TextField -> when submitted, this should POST a message to the DB
 * and the update should show up in the news feed
 *
 */
class TextField extends Component {

  render() {
    return (
      <div className="text-field">
        {/* <form action={() => { console.log('field submitted!'); return false; }}> */}
          <input type="text" placeholder="Status.." />
        {/* </form> */}
      </div>
    );
  }
}

export default TextField;
