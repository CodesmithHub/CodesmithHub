import React, { Component } from 'react'
import axios from 'axios'
import MessageContainer from './messageContainer.jsx'

class ChatBox extends Component {

  state = {
    messages: [],
    text: ''
  }

  componentDidMount () {
    axios.get('/messages')
      .then(res => {
        console.log('RETURNED RESPONSE FROM GET MESSAGES: ', res)
        this.setState({
          messages: res.data
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  handleClick = () => {
    console.log(this.state.text);
    axios.post('/messages', {
      username: this.props.user.firstname,
      message: this.state.text,
      created_on: new Date(Date.now())
    })
      .then(res => {
        console.log('POST REQUEST RESPONSE: ', res.data)
        this.setState({
          messages: [...this.state.messages, res.data]
        })
      })
  }


  render () {
    return (
      <div>
        <MessageContainer messages={this.state.messages}/>
        <input type='text' value={this.state.text} onChange={this.handleChange} />
        <button type='submit' onClick={this.handleClick}>ADD MESSAGE</button>
      </div>
    )
  }

}

export default ChatBox
