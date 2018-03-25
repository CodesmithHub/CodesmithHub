import React from 'react';

const FeedItem = props => (
  <li className="feed-item">
    <img src={props.imgURL} alt={`${props.username  }'s picture`} />
    <span>{props.username}    {props.message}</span>
  </li>
);


export default FeedItem;
