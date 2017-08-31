import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App.js';
import SignUp from './user/signup.js';
import LogIn from './user/login.js';
import Directory from './components/directory.jsx';
import MainPage from './components/mainPage.jsx';



document.addEventListener('DOMContentLoaded', function() {

  ReactDOM.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>,
    document.getElementById('mount'),
  );
});
