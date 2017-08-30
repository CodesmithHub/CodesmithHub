import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

class SignUp extends React.Component {

  state = {
    loggedIn: false,
    user: {},
    avatar: 'https://d3c5s1hmka2e2b.cloudfront.net/uploads/topic/image/438/codesmith_logo.png',
    imgLink: '',
  }

  handleAvatar = (e) => {
    this.setState({
      avatar: e.target.src
    })
  }

  handleChange = (e) => {
    this.setState({
      imgLink: e.target.value
    })
  }

  submitAvatar = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        avatar: this.state.imgLink
      })
    }
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <Redirect to={{pathname: "/main", state: { from: this.state.user } }} />
      )
    }

    return (
      <div>
        <table>
          <tbody>
            <tr>
            <th className="header">CodesmithHub</th>
            </tr>
            <tr>
              <td className="tableContent">
                <div className="input">
                  <form>
                      <b>First Name:</b> <input type='text' id='firstname'/>
                      <br/><br/>
                      <b>Last Name:</b> <input type='text' id='lastname'/>
                      <br/><br/>
                      <b>Email:</b> <input type='text' id='email' placeholder='email'/>
                      <br/><br/>
                      <b>Password:</b> <input type='password' id='password' placeholder='password'/>
                      <br/><br/>
                      <b>Where do you consider yourself from?</b> <input type='text' id='hometown'/>
                      <br/><br/>
                      <b>What were you doing before Codesmith:</b> <input type='text' id='past'/>
                      <br/><br/>
                      <b>What do you want to do with your coding skills?</b> <input type='text' id='future'/>
                      <br/><br/>
                      <b>What are your passions and hobbies?</b> <input type='text' id='hobbies'/>
                      <br/><br/>
                      <b>What is a fun or random fact about yourself?</b> <input type='text' id='random'/>
                      <br/><br/>
                      <div>
                        <label>Choose an AVATAR or add image address:
                          <input type='text' value={this.state.imgLink} onChange={this.handleChange} onKeyPress={this.submitAvatar} />
                        </label>
                        <img src='https://raw.github.com/hashdog/node-identicon-github/master/examples/images/01.png' style={{width: 40, height: 40, marginRight: 15}} className='a' onClick={this.handleAvatar}/>
                        <img src='https://raw.github.com/hashdog/node-identicon-github/master/examples/images/02.png' style={{width: 40, height: 40, marginRight: 15}} className='b' onClick={this.handleAvatar}/>
                        <img src='https://raw.github.com/hashdog/node-identicon-github/master/examples/images/03.png' style={{width: 40, height: 40, marginRight: 15}} className='c' onClick={this.handleAvatar}/>
                        <img src='https://raw.github.com/hashdog/node-identicon-github/master/examples/images/05.png' style={{width: 40, height: 40, marginRight: 15}} className='d' onClick={this.handleAvatar}/>
                        <img src='https://raw.github.com/hashdog/node-identicon-github/master/examples/images/06.png' style={{width: 40, height: 40, marginRight: 15}} className='e' onClick={this.handleAvatar}/>
                      </div>
                      <p>Image Preview: </p>
                      <img src={this.state.avatar} style={{height: 60, width: 60}} className='img-preview' />
                  </form>
                </div>
                <br/><br/>
                <button type='submit' onClick={this.userInfo}>CreateAccount</button>
                <button>
                  <Link to='/'>Login</Link>
                </button>
                </td>
                </tr>
          </tbody>
        </table>
      </div>
    )
  }

  /** This function is used to sign up a user */
  userInfo = (e) => {
    e.preventDefault();
    const data = {
      firstname: document.getElementById('firstname').value,
      lastname: document.getElementById('lastname').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      hometown: document.getElementById('hometown').value,
      past: document.getElementById('past').value,
      future: document.getElementById('future').value,
      hobbies: document.getElementById('hobbies').value,
      random: document.getElementById('random').value,
      avatar: this.state.avatar
    }

    axios.post('/authenticate/create', data)
    .then((response) => {
      if (response.status === 200) {
        this.setState({ loggedIn: true, user: response.data.id });
      }
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
  }
}

export default SignUp;
