import React, { Component } from 'react'
import { render } from 'react-dom'

class SignUp extends React.Component {
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
                <label htmlFor='email'><b>Email:</b></label>
                <input type='text' id='email'/>
              </div>
              <br/>
              <div className= 'input'>
                <label htmlFor='password'><b>New Password:</b></label>
                <input type='password' id='password'/>
              </div>
              <br/><br/>
              <button>CreateAccount</button>
              </td>
              </tr>
        </table>
      </div>
    )
  }
}


export default SignUp;
