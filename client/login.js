import React, { Component } from 'react';

class LogIn extends React.Component {

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
                    <b>Email:</b> <input type="text" id="loginEmail" />
                    <br/><br/>
                    <b>Password:</b> <input type="password" id="loginPassword" />
                  </form>
                </div>
                <br/>
                <br/>
                <button type="submit" onClick={this.loginInfo}>LogIn</button>
                <button type="Login" onClick={() => { this.props.changeView('SignUp'); }} >SignUp?</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  loginInfo() {
    const data = {
      email: document.getElementById('loginEmail').value,
      password: document.getElementById('loginPassword').value,
    };

    axios.post('/login', data)
    .then((response) => {
      if (response.status === 200) {
        console.log('should be logging in...');
        console.log(this);        
        console.log(this.props);

        // need to set user to logged in user
        this.props.changeView('feed');
      }
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
  }
}

export default LogIn;
