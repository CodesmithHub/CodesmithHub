import React from 'react';

/**
 * DirectoryItem will return a list item <li> containing details about each user
 *
 * Props: username, imgURL, pageURL, key
 */
const DirectoryItem = (props) => {
  // TODO change href to this.props.pageURL
  return (
    <li className="directory-item">
      <a href='#'>
        <img src={props.imgURL} alt={props.username + "'s pic"}
          onClick={() => { props.viewProfile(props.id); }} />
      </a>
      <span>{props.username}</span>
    </li>
  );
};


export default DirectoryItem;
