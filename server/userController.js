const { Client } = require('pg');
const connectionString = 'postgres://taviagze:xhNoQjlMqnEg86XbeWnAyTN-TEl_Dqyc@stampy.db.elephantsql.com:5432/taviagze';
const pg = new Client({ connectionString });
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const userController = {};


//connect to Postgres
pg.connect((err, client, done) => {
    if (err) console.log(err);
    console.log('connected to db');
  });


//create user in Postgres
userController.createUser = (request, response) => {
    //encrypt password before saving to DB
    const hash = bcrypt.hashSync(request.body.password, salt);
    pg.query({
        name: 'create-user',
        text: "INSERT INTO users (firstname, lastname, email, password, hometown, past, future, hobbies, random) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);",
        values: [
            request.body.firstname,
            request.body.lastname,
            request.body.email.toLowerCase(),
            hash,
            request.body.hometown,
            request.body.past,
            request.body.future,
            request.body.hobbies,
            request.body.random
        ]
    })
        .then(res => response.status(200).json('User created!'))
        .catch(err => response.status(400).json('An error occurred: ' + err));
}

//verify user on login
userController.verifyUser = (request, response) => {
    const email = request.body.email.toLowerCase();
    //encrypt input password to compare to hashed password stored in DB => **one way encryption**
    const hash = bcrypt.hashSync(request.body.password, salt);
    pg.query("SELECT * FROM users WHERE email = '" + email + "';")
        .then(res => {
            if(!res.rows.length) response.status(400).json('User not found!');
            else {
                if(res.rows[0].password === hash) response.status(200).json('OK');
                else return response.status(400).json('INCORRECT PASSWORD');
            }
        })
        .catch(err => response.status(400).json('Something went wrong: ', err));
}



module.exports = userController;