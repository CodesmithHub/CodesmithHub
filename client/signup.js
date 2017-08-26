import React, { Component } from 'react'
import { render } from 'react-dom'

class SignUp extends React.Component {

  constructor() {
    super();
    this.userInfo = this.userInfo.bind(this);
  }

  render() {
    console.log(this.props);
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
                    <b>First Name:</b> <input type="text" id="firstname" />
                    <br/><br/>
                    <b>Last Name:</b> <input type="text" id="lastname" />
                    <br/><br/>
                    <b>Email:</b> <input type="text" id="email" />
                    <br/><br/>
                    <b>Password:</b> <input type="password" id="password" />
                    <br/><br/>
                    <b>Where do you consider yourself from?</b> <input type="text" id="hometown" />
                    <br/><br/>
                    <b>What were you doing before Codesmith:</b> <input type="text" id="past" />
                    <br/><br/>
                    <b>What do you want to do with your coding skills?</b> <input type="text" id="future" />
                    <br/><br/>
                    <b>What are your passions and hobbies?</b> <input type="text" id="hobbies" />
                    <br/><br/>
                    <b>What is a fun or random fact about yourself?</b> <input type="text" id="random" />
                  </form>
                </div>
                <br/><br/>
                <button type="submit" onClick={this.userInfo}>CreateAccount</button>
                <button type="Login" onClick={() => { this.props.changeView('Login'); }} >LogIn</button>
                </td>
                </tr>
          </tbody>
        </table>
      </div>
    )
  }

  /** This function is used to sign up a user */
  userInfo() {
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
    }

    axios.post('/createuser', data)
    .then((response) => {
      if (response.status === 200) {
        console.log('should be logging in...');
        console.log(this);
        console.log(this.props);
        // also need to save user as the newly created user
        this.props.changeView('feed');
      }
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
  }
}

export default SignUp;
