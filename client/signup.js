const React = require('react');
const axios = require('axios');
const { Redirect } = require('react-router-dom');

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = { loggedIn: false, user: {} };
    this.userInfo = this.userInfo.bind(this);
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

  render() {
    if (this.state.loggedIn) {
      return (
        <Redirect to={{ pathname: "/main", state: { from: this.state.user } }} />
      );
    }

    return (
      <div>
        <section id="register" className="content section-grey" >
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3">
                <div className="register-box box-shadow rounded-x2">
                  <h4 className="text-center weight-700">Sign Up</h4>
                  <hr />

                  <form role="form" onSubmit={this.userInfo}>
                    <div className="input-group margin-right-20">
                      <label htmlFor="firstname">First Name</label>
                      <input type="text" className="form-control" id="firstname" name="First Name" placeholder="First Name" />
                    </div>
                    <div className="input-group margin-right-20">
                      <label htmlFor="lastname">Last name</label>
                      <input type="text" className="form-control" id="lastname" name="Last Name" placeholder="Last Name" />
                    </div>
                    <div className="input-group margin-right-20">
                      <label htmlFor="email">Email Address</label>
                      <input type="text" className="form-control" id="email" name="Email" placeholder="Email" />
                    </div>
                    <div className="input-group margin-right-20">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" id="password" name="Password" placeholder="Password" />
                    </div>
                    <div className="input-group margin-right-20">
                      <label htmlFor="hometown">Where do you consider yourself from?</label>
                      <input type="textarea" className="form-control" id="hometown" />
                    </div>
                    <div className="input-group margin-right-20">
                      <label htmlFor="past">What were you doing before Codesmith?</label>
                      <input type="textarea" className="form-control" id="past" />
                    </div>

                    <div className="input-group margin-right-20">
                      <label htmlFor="future">What do you want to do with your coding skills?</label>
                      <input type="textarea" className="form-control" id="future" />
                    </div>

                    <div className="input-group margin-right-20">
                      <label htmlFor="hobbies">What are your passions and hobbies?</label>
                      <input type="textarea" className="form-control" id="hobbies" />
                    </div>

                    <div className="input-group margin-right-20">
                      <label htmlFor="random">What is a fun or random fact about yourself?</label>
                      <input type="textarea" className="form-control" id="random" />
                    </div>

                    <button type="submit" className="btn btn-primary rounded pi-btn-default btn-xlg" onClick={this.userInfo}>Create Account</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SignUp;
