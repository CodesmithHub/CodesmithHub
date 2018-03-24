import React from 'react';
import axios from 'axios';

import Header from './containers/Header';
import Main from './containers/Main';
import LogIn from './views/login_signup/components/LogIn';
import SignUp from './views/login_signup/components/SignUp';


class App extends React.Component {
  constructor() {
    super();
    this.state = { loggedIn: false, user: {} };

    this.loginInfo = this.loginInfo.bind(this);
    this.userInfo = this.userInfo.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  loginInfo(e) {
    e.preventDefault();

    const data = {
      email: document.getElementById('loginEmail').value,
      password: document.getElementById('loginPassword').value,
    };

    axios.post('/authenticate/validate', data)
      .then((response) => {
        console.log(this);
        if (response.status === 200) {
          this.setState({ loggedIn: true, user: response.data.id });
        }
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      });
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
    };

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

  handleLogOut(e) {
    e.preventDefault();
    this.setState({ loggedIn: false, user: {} });
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <Header handleLogOut={this.handleLogOut} />
          <Main user={this.state.user} />
        </div>
      );
    }

    return (
      <div>
        <LogIn loginInfo={this.loginInfo} />
        <SignUp userInfo={this.userInfo} />
      </div>
    );
  }
}
export default App;
