import React, { Component } from 'react'
import axios from 'axios'
import MessageContainer from './messageContainer.jsx'
import { Redirect } from 'react-router-dom'

class ChatBox extends Component {

  state = {
    messages: [],
    text: '',
    authExpired: false
  }

  componentDidMount () {
    axios.get('/messages')
      .then(res => {
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
        if (!res.data) {
          this.setState({
            authExpired: true
          })
        } else {
          this.setState({
            messages: [...this.state.messages, res.data]
          })
        }
      })
  }

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      console.log(this.state.text);
      axios.post('/messages', {
        username: this.props.user.firstname,
        message: this.state.text,
        created_on: new Date(Date.now())
      })
        .then(res => {
          if (!res.data) {
            this.setState({
              authExpired: true
            })
          } else {
            this.setState({
              messages: [...this.state.messages, res.data]
            })
          }
        })
    }
  }

  render () {
    if (this.state.authExpired) {
      alert('Session expired..please login again');
      return (
        <Redirect to='/' />
      )
    }
    return (
      <div>
        <MessageContainer messages={this.state.messages}/>
        <input type='text' value={this.state.text} onChange={this.handleChange} onKeyPress={this.handleEnter}/>
        <button type='submit' onClick={this.handleClick}>ADD MESSAGE</button>
      </div>
    )
  }

}

export default ChatBox
