import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App.js';
import SignUp from './signup.js';
import LogIn from './login.js';

document.addEventListener('DOMContentLoaded', function() {

  ReactDOM.render(
    <BrowserRouter>
      <div>
      <Route path='/' component={App}/>
      <Route path='/signup' component={SignUp}/>
      </div>
    </BrowserRouter>,
    document.getElementById('mount'),
  );
});
