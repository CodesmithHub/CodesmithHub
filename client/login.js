const React = require('react');
const axios = require('axios');
const { Link, Redirect } = require('react-router-dom');

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = { loggedIn: false, user: {} };
    this.loginInfo = this.loginInfo.bind(this);
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

  render() {
    if (this.state.loggedIn) {
      return (
        <Redirect to={{ pathname: '/main', state: { from: this.state.user } }} />
      );
    }
    return (

      <nav className="navbar navbar-inverse">
        <div className="container">

          <div className="navbar-header">
            <a className="navbar-brand" >CodesmithHub</a>
          </div>


          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <form id="signin" className="navbar-form navbar-right" role="form" onSubmit={this.loginInfo}>
              <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                <input id="loginEmail" type="email" className="form-control" name="email" placeholder="email" />
              </div>

              <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-lock" /></span>
                <input id="loginPassword" type="password" className="form-control" name="password" placeholder="password" />
              </div>

              <button type="submit" className="btn btn-primary">Login</button>
              <Link to="/signup"><button type="submit" className="btn btn-primary">SignUp</button></Link>
            </form>

          </div>
        </div>
      </nav>
    );
  }
}
export default LogIn;
