import React from 'react';
import LogIn from './login.js';
import SignUp from './signup.js';



/**
* A counter button: tap the button to increase the count.
*/
class App extends React.Component {
 constructor() {
   super();
   this.state = {
   };
 }

 render() {
   return (
     <div>Dis be da App
      <LogIn />
      <SignUp />
     </div>

   );
 }
}
export default App
