const express = require('express');
const { Client } = require('pg');
const connectionString = 'postgres://taviagze:xhNoQjlMqnEg86XbeWnAyTN-TEl_Dqyc@stampy.db.elephantsql.com:5432/taviagze';
const pg = new Client({ connectionString });


const messageController = {};

pg.connect((err, client, done) => {
    if (err) console.log(err);
    else console.log('connected to db');
});

messageController.postMessage = (req, res, next) => {
  console.log(req.body)
  console.log('INSIDE POST MESSAGE')
  pg.query('INSERT INTO messages(firstname, message, created_on) VALUES($1, $2, $3)', [req.body.username, req.body.message, req.body.created_on], function (err, message) {
    res.send(req.body)
  })
}

messageController.getMessages = (req, response, next) => {

  pg.query('SELECT * FROM messages ORDER BY id ASC')
    .then(res => {
        let messages = res.rows.reduce((acc, msg) => {
            acc.push({
                username: msg.firstname,
                message: msg.message,
                created_on: msg.created_on,
            })
            return acc;
        }, []);
        response.status(200).json(messages);
    })
}

module.exports = messageController;
