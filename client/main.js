import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styles from './style.css';


document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(App),
    document.getElementById('mount')
  );
});
