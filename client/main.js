import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App.js';
import SignUp from './signup.js';
import LogIn from './login.js';
import Directory from './directory.jsx';
import MainPage from './mainPage.jsx';



document.addEventListener('DOMContentLoaded', function() {

  ReactDOM.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>,
    document.getElementById('mount'),
  );
});
