import React, { Component } from 'react'
import axios from 'axios'

class ChatBox extends Component {

  state = {
    text: ''
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  handleClick = () => {
    console.log(this.state.text);
    axios.post('/messages', {
      username: this.props.user,
      message: this.state.text,
      created_on: new Date(Date.now())
    }).then(res => {
      console.log(res)
    })
  }

  render () {
    return (
      <div>
        <div className="container"></div>
        <input type='text' value={this.state.text} onChange={this.handleChange} />
        <button type='submit' onClick={this.handleClick}>ADD MESSAGE</button>
      </div>
    )
  }

}

export default ChatBox
