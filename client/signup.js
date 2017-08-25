import React, { Component } from 'react'
import { render } from 'react-dom'

class SignUp extends React.Component {

  // componentDidMount(
  // axios.post('/user', {
  //   firstName: 'Fred',
  //   lastName: 'Flintstone'
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
  //
     data = {
       email: this.props.email,
       password: this.props.password
     }

  submitForm = (e) => {
    e.preventDefault();
    this.props.data({
      email: this.id.email.value,
      password: this.id.password.value
    });

    this.id.email.value = null;
    this.id.password.value = null;
  }




  render() {


    return (
      <div>
        <table>
          <tr>
          <th className='header'>CodesmithHub</th>
          </tr>
          <tr>
            <td className='tableContent'>
              <div className='input'>
                <form>
                    <b>First Name:</b> <input type='text' id='firstname' value={this.props.firstname}/>
                    <br/><br/>
                    <b>Last Name:</b> <input type='text' id='lastname' value={this.props.lastname}/>
                    <br/><br/>
                    <b>Email:</b> <input type='text' id='email' value={this.props.email}/>
                    <br/><br/>
                    <b>Password:</b> <input type='text' id='password'value={this.props.password}/>
                    <br/><br/>
                    <b>Hometown:</b> <input type='text' id='hometown' value={this.props.hometown}/>
                    <br/><br/>
                    <b>What were you doing before Codesmith:</b> <input type='text' id='past' value={this.props.past}/>
                    <br/><br/>
                    <b>Furturn Goals:</b> <input type='text' id='future' value={this.props.future}/>
                    <br/><br/>
                    <b>Hobbies:</b> <input type='text' id='hobbies' value={this.props.hobbies}/>
                    <br/><br/>
                    <b>Random Facts:</b> <input type='text' id='random' value={this.props.random}/>
                </form>
              </div>
              <br/><br/>
              <button type='submit'>CreateAccount</button>
              </td>
              </tr>
        </table>
      </div>
    )
  }
}




export default SignUp
