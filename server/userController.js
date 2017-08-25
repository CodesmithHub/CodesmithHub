const { Client } = require('pg');
const connectionString = 'postgres://taviagze:xhNoQjlMqnEg86XbeWnAyTN-TEl_Dqyc@stampy.db.elephantsql.com:5432/taviagze';
const pg = new Client({ connectionString: connectionString });

const userController = {};

pg.connect((err, client, done) => {
    if (err) console.log(err);
    console.log('connected to db');
  });

userController.createUser = (request, response) => {
    let entry = "'" + request.body.firstname + "','" + request.body.lastname + "','" + request.body.email + "','" + request.body.password + "','" + 
    request.body.hometown + "','" + request.body.past + "','" + request.body.future + "','" + request.body.hobbies + "','" + request.body.random + "'";
    pg.query("INSERT INTO users (firstname, lastname, email, password, hometown, past, future, hobbies, random) VALUES (" + entry + ");")
        .then(res => response.json('User created!'))
        .catch(err => response.json('An error occurred: ' + err));
}

 



module.exports = userController;