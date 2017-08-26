import React, { Component } from 'react'
import { render } from 'react-dom'

class LogIn extends React.Component {

  constructor() {
    super();

    // this.loginInfo = this.loginInfo.bind(this)
}

render() {


  return (
    <div>
      <table>
          <tbody>
          <tr>
          <th className='header'>CodesmithHub</th>
          </tr>
          <tr>
            <td className='tableContent'>
              <div className='input'>
                <form>
                  <b>Email:</b> <input type='text' id='loginEmail' />
                  <br/><br/>
                  <b>Password:</b> <input type='text' id='loginPassword'/>
                </form>
              </div>
              <br/><br/>
              <button type='submit' onClick={this.loginInfo}>LogIn</button>
              <button>SignUp?</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}


// componentDidMount() {
//   this.loginInfo();
// }
//
//   loginInfo() {
//     let data = {
//       firstname: 'Balal',
//       lastname: 'Zuhair',
//       email: document.getElementById('loginEmail').value,
//       password: document.getElementById('loginPassword').value,
//       hometown: 'Los Angeles',
//       past: 'Chemistry',
//       future: 'Coding',
//       hobbies: 'Kicking ass',
//       random: 'There was a time when I ate ONLY kimchi.'
//     }
//
//     axios.post('/login', data)
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }

//
}








export default LogIn;
