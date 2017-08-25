import React, { Component } from 'react'
import { render } from 'react-dom'

class LogIn extends React.Component {
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
                  <b>Email:</b> <input type='text' id='email' value={this.props.email}/>
                  <br/><br/>
                  <b>Password:</b> <input type='text' id='password'value={this.props.password}/>
                </form>
              </div>
              <br/><br/>
              <button type='submit'>LogIn</button>
              <button>SignUp?</button>
              </td>
              </tr>
        </table>
      </div>
    )
  }
}






export default LogIn
