import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

class SignUp extends React.Component {

  constructor() {
    super();
    this.state = { loggedIn: false, user: {} };
    this.userInfo = this.userInfo.bind(this);
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
                      <b>Profile Picture: </b> <input type='text' id='picture' />
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
    userInfo(e) {
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
        picture: document.getElementById('picture').value
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
