import React, { Component } from 'react';
import { render } from 'react-dom';
import SignUp from './signup.js';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import MainPage from './../components/mainPage.jsx';

class LogIn extends React.Component {

  constructor() {
    super();
    this.state = { loggedIn: false, user: {} };
    this.loginInfo = this.loginInfo.bind(this);
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <Redirect to={{pathname: "/main", state: { from: this.state.user } }} />
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
              <td className="tableContent">
                <div className="input">
                  <form onSubmit={this.loginInfo}>
                    <b>Email:</b> <input type="text" id="loginEmail" placeholder="email"/>
                    <br/><br/>
                    <b>Password:</b> <input type="password" id="loginPassword" placeholder="password"/>
                    <br/><br/>
                    <button type="submit">LogIn</button>
                    <button>
                      <Link to="/signup">Signup</Link>
                    </button>
                  </form>
                </div>
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
      password: document.getElementById('loginPassword').value,
    }

    axios.post('/authenticate/validate', data)
    .then((response) => {
      if (response.status === 200) {
        this.setState({ loggedIn: true, user: response.data.id });
      } else {
        console.log('hello')
      }
    })
  }
}

export default LogIn;
