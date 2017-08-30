const express = require('express');
const { Client } = require('pg');
const connectionString = 'postgres://taviagze:xhNoQjlMqnEg86XbeWnAyTN-TEl_Dqyc@stampy.db.elephantsql.com:5432/taviagze';
const pg = new Client({ connectionString });


const messageController = {};

messageController.postMessage = (req, res, next) => {
  console.log(req.body)
  console.log('INSIDE POST MESSAGE')
  pg.query('INSERT INTO messages(id, firstname, message) VALUES($0, $1, $2)', [1, 'GRANT', 'HELLO'], function (err, something) {
    console.log(something)
  })
  // pg.query({
  //   name: 'post',
  //   text: 'INSERT INTO messages ("firstname", "messages") VALUES ($1, $2)',
  //   values: [req.body.username, req.body.message]
  // });
  //   .then(res => res.status(200).json('Post created!'))
  //   .catch(err => res.status(400).json('An error occurred: ', err));
  // pg.query(`INSERT INTO messages (firstname, messages) VALUES (${req.body.username}, ${req.body.message});`)
}

module.exports = messageController;
