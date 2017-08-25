import React from 'react';
import LogIn from './login.js';
import SignUp from './signup.js';
// import $ from ‘jquery’;



/**
* A counter button: tap the button to increase the count.
*/
class App extends React.Component {
 constructor() {
   super();
   this.state = {
     firstname: '',
     lastname: '',
     email: '',
     password: '',
     hometown: '',
     past: '',
     future: '',
     hobbies: '',
     random: '',
   };
 }

 render() {
   return (
     <div>Dis be da App
      <LogIn login={{email:this.state.email, password:this.state.password}}/>
      <SignUp sign={this.state}/>
     </div>

   );
 }
}
export default App
