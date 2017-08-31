import React, { Component } from 'react';
import FeedItem from './feedItem.jsx';
import { Redirect } from 'react-router-dom'

class ProfilePage extends Component {

  state = {
    feedItems: [],
    edit: false,
    avatar: this.props.avatar,
    hometown: this.props.hometown,
    past: this.props.past,
    future: this.props.future,
    hobbies: this.props.hobbies,
    random: this.props.random,
    relog: false,
  }

  componentDidMount () {
    axios.post('/user/posts', { user_id: this.props.id })
      .then(res => {
        this.setState({
          feedItems: res.data
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.className]: e.target.value
    })
  }

  handleClick = () => {
    console.log('hello')
    this.setState({
      edit: true,
    })
  }

  handleClick2 = (e) => {
    console.log(this.state.relog)
    const data = {
      hometown: this.state.hometown,
      past: this.state.past,
      future: this.state.future,
      hobbies: this.state.hobbies,
      random: this.state.random,
      avatar: this.state.avatar,
    }
    axios.patch(`/user/all/${this.props.id}`, data)
      .then(() =>
        this.setState({
          relog: true
        })
      )
  }

  render() {

    if (this.state.relog) {
      if (confirm("Please log in again to confirm changes")) {
        return (
          <Redirect to='/' />
        )
      }
    }

    if (this.state.edit) {
      return (
        <div className="profile-page">
          <div className="questions">
            <h4 className="question">Edit Avatar</h4>
              <input type='text' className='avatar' value={this.state.avatar} onChange={this.handleChange}/>
            <h4 className="question">Where do you consider yourself from?</h4>
              <input type='text' className='hometown' value={this.state.hometown} onChange={this.handleChange}/>
            <h4 className="question">What were you doing before Codesmith?</h4>
              <input type='text' className='past' value={this.state.past} onChange={this.handleChange}/>
            <h4 className="question">What do you want to do with your coding skills?</h4>
              <input type='text' className='future' value={this.state.future} onChange={this.handleChange}/>
            <h4 className="question">What are your passions and hobbies?</h4>
              <input type='text' className='hobbies' value={this.state.hobbies} onChange={this.handleChange}/>
            <h4 className="question">What is a fun or random fact about yourself?</h4>
              <input type='text' className='random' value={this.state.random} onChange={this.handleChange}/>
          </div>
          <button className='btn btn-primary rounded pi-btn-default margin-right-10' type="submit" onClick={this.handleClick2}> SAVE </button>
        </div>
      )
    }

    if (this.props.edit) {
      return (
        <div className="profile-page">
          <img
            className="profile-pic"
            alt="profile pic"
            src={this.props.avatar}
          />
          <h1 className="username">{this.props.username}</h1>
          <div className="questions">
            <h4 className="question">Where do you consider yourself from?</h4>
            <p>{this.props.hometown}</p>
            <h4 className="question">What were you doing before Codesmith?</h4>
            <p>{this.props.past}</p>
            <h4 className="question">What do you want to do with your coding skills?</h4>
            <p>{this.props.future}</p>
            <h4 className="question">What are your passions and hobbies?</h4>
            <p>{this.props.hobbies}</p>
            <h4 className="question">What is a fun or random fact about yourself?</h4>
            <p>{this.props.random}</p>
          </div>
          <button className='btn btn-primary rounded pi-btn-default margin-right-10' type='submit' onClick={this.handleClick} > EDIT </button>
        </div>

      )
    }
    return (
      <div className="profile-page">
        <img
          className="profile-pic"
          alt="profile pic"
          src={this.props.avatar}
        />
        <h1 className="username">{this.props.username}</h1>
        <div className="questions">
          <h4 className="question">Where do you consider yourself from?</h4>
          <p>{this.props.hometown}</p>
          <h4 className="question">What were you doing before Codesmith?</h4>
          <p>{this.props.past}</p>
          <h4 className="question">What do you want to do with your coding skills?</h4>
          <p>{this.props.future}</p>
          <h4 className="question">What are your passions and hobbies?</h4>
          <p>{this.props.hobbies}</p>
          <h4 className="question">What is a fun or random fact about yourself?</h4>
          <p>{this.props.random}</p>
        </div>
      </div>
    );
  }


}

export default ProfilePage;
