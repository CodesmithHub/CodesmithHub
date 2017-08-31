import React, {Component} from 'react'

class MessageItem extends Component {

  render () {
    return (
      <div>
        <p>{this.props.user}: {this.props.message}</p>
        <p style={{fontSize: 8}}>{this.props.time}</p>
      </div>

    )
  }

}

export default MessageItem
