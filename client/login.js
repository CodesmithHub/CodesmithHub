import React, { Component } from 'react';

class LogIn extends React.Component {

  /** POST this data to the database, and log in user if password correct */
  loginInfo() {
    const data = {
      email: document.getElementById('loginEmail').value,
      password: document.getElementById('loginPassword').value,
    };

    axios.post('/login', data)
    .then((response) => {
      if (response.status === 200) {
        console.log('should be logging in...');
        this.props.setID(response.data.id); // set the logged in user
        this.props.changeView('Feed');
      }
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
  }

  render() {
    this.loginInfo = this.loginInfo.bind(this);

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
                  <form>
                    <b>Email:</b> <input type="text" id="loginEmail" />
                    <br/><br/>
                    <b>Password:</b> <input type="password" id="loginPassword" />
                  </form>
                </div>
                <br/>
                <br/>
                <button className="btn btn-lg button" type="submit" onClick={this.loginInfo}>LogIn</button>
                <button className="btn btn-lg button" type="Login" onClick={() => { this.props.changeView('SignUp'); }} >SignUp?</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default LogIn;
