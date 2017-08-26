import React, { Component } from 'react';
import { render } from 'react-dom';
import SignUp from './signup.js';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import MainPage from './mainPage.jsx';

class LogIn extends React.Component {

  constructor() {
    super();
    this.state = {loggedIn: false}
    this.loginInfo = this.loginInfo.bind(this)
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <Redirect to='/main'/>
      )
    }
    
    return (
      <div className="login-page">
        <table>
          <tbody>
            <tr>
              <th className="header">CodesmithHub</th>
            </tr>
            <tr>
              <td className='tableContent'>
                <div className='input'>
                  <form onSubmit={this.loginInfo}>
                    <b>Email:</b> <input type='text' id='loginEmail' placeholder='email'/>
                    <br/><br/>
                    <b>Password:</b> <input type='password' id='loginPassword' placeholder='password'/>
                    <br/><br/>
                    <button type='submit'>LogIn</button>
                    <button>
                      <Link to='/signup'>Signup</Link>
                    </button>
                  </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  loginInfo(e) {
    e.preventDefault();

    const data = {
      email: document.getElementById('loginEmail').value,
      password: document.getElementById('loginPassword').value
    }

    axios.post('/login', data)
    .then((response) => {
      console.log(this);
      if (response.status === 200) {
        this.setState({loggedIn: true})
        this.props.setID(response.data.id);
      }
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
  }
}

export default LogIn;
