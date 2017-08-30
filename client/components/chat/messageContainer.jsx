import React, { Component } from 'react'
import MessageItem from './messageItem.jsx'

class MessageContainer extends Component {

  render () {
    return (
      <div>
        {this.props.messages.map((msg, index) =>
          <MessageItem
            key={index}
            message={msg.message}
            user={msg.username}
            time={msg.created_on}
          />)}
      </div>
    )
  }

}

export default MessageContainer
