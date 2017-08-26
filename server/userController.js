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
            if (!res.rows.length) response.status(400).json('User not found!');
            else {
                if (bcrypt.compareSync(request.body.password, res.rows[0].password)) {
                    response.status(200).json({id: res.rows[0].user_id});
                } else return response.status(400).json('INCORRECT PASSWORD');
            }
        })
        .catch(err => response.status(400).json('Something went wrong: ', err));
}

// return list of users
userController.grabUsers = (request, response) => {
    pg.query("SELECT * FROM users")
        .then(res => {
            let users = res.rows.reduce((acc, user) => {
                acc.push({
                    id: user.user_id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    hometown: user.hometown,
                    past: user.past,
                    future: user.future,
                    hobbies: user.hobbies,
                    random: user.random
                })
                return acc;
            }, []);
            response.status(200).json(users);
        })
        .catch(err => { console.log(err); response.status(400).json('Something went wrong: ', err) });
}

// return list of user posts
userController.grabPosts = (request, response) => {
    let id = request.body.user_id;
    pg.query({
        name: 'grab-posts',
        text: "SELECT userposts.post FROM userposts WHERE userposts.user = $1;",
        values: [id]
    })
        .then(res => { console.log(res.rows); response.status(200).json(res.rows) })
        .catch(err => { console.log('err: ', err); response.status(400).json('Error: ', err) })
}

// create new post in DB
userController.addPost = (request, response) => {
    pg.query({
        name: 'create-post',
        text: 'INSERT INTO userposts ("user", "post") VALUES ($1, $2);',
        values: [request.body.user_id, request.body.post]
    })
        .then(res => response.status(200).json('Post created!'))
        .catch(err => response.status(400).json('An error occurred: ' + err));
}



module.exports = userController;