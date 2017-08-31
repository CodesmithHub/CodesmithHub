const { Client } = require('pg');
const connectionString = 'postgres://taviagze:xhNoQjlMqnEg86XbeWnAyTN-TEl_Dqyc@stampy.db.elephantsql.com:5432/taviagze';
const pg = new Client({ connectionString });
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const userController = {};


//connect to Postgres
pg.connect((err, client, done) => {
    if (err) console.log(err);
    else console.log('connected to db');
});

//create user in Postgres
userController.createUser = (request, response, next) => {
    //encrypt password before saving to DB
    const hash = bcrypt.hashSync(request.body.password, salt);
    pg.query({
        name: 'create-user',
        text: "INSERT INTO users (firstname, lastname, email, password, hometown, past, future, hobbies, random, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);",
        values: [
            request.body.firstname,
            request.body.lastname,
            request.body.email.toLowerCase(),
            hash,
            request.body.hometown,
            request.body.past,
            request.body.future,
            request.body.hobbies,
            request.body.random,
            request.body.avatar,
        ]
    })
        .then(resolution => {
            pg.query("SELECT * FROM users WHERE email = '" + request.body.email.toLowerCase() + "';")
                .then(res => {
                    request.body.return = {id: res.rows[0].user_id};
                    next();
                })
                .catch(err => response.status(400).json('Something went terribly wrong: ', err));
        })
        .catch(err => response.status(400).json('An error occurred: ' + err));
}

//verify user on login
userController.verifyUser = (request, response, next) => {
    const email = request.body.email.toLowerCase();
    pg.query("SELECT * FROM users WHERE email = '" + email + "';")
        .then(res => {
            if (!res.rows.length) response.status(400).json('User not found!');
            else {
                if (bcrypt.compareSync(request.body.password, res.rows[0].password)) {
                    request.body.return = {id: res.rows[0].user_id};
                    next();
                } else return response.status(400).send('INCORRECT PASSWORD');
            }
        })
        // .catch(err => response.status(400).json('Something went wrong: ', err));
}

// return list of users
userController.grabUsers = (request, response) => {
    console.log('hello');
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
                    random: user.random,
                    avatar: user.avatar
                })
                return acc;
            }, []);
            response.status(200).json(users);
        })
        .catch(err => { console.log(err); response.status(400).json('Something went wrong: ', err) });
}

userController.editUser = (req, res) => {
  console.log('edit user body: ', req.body)
  console.log('edit user params: ', req.params)
  pg.query(`
    UPDATE users
    SET hometown = '${req.body.hometown}', past = '${req.body.past}', future = '${req.body.future}', hobbies = '${req.body.hobbies}', random = '${req.body.random}', avatar = '${req.body.avatar}'
    WHERE user_id = ${req.params.id}
  `)
  .then(() => {
    res.send(req.body)
  })
}

// return list of posts for a given user
userController.grabPosts = (request, response) => {
  pg.query({
      name: 'grab-posts',
      text: "SELECT userposts.post FROM userposts WHERE userposts.user = $1;",
      values: [request.body.user_id]
  })
    .then(res => response.status(200).json(res.rows))
    .catch(err => { console.log('err: ', err); response.status(400).json('Error: ', err) })
}

// create new post in DB
userController.addPost = (request, response) => {
    console.log('add post', res)
    pg.query({
        name: 'create-post',
        text: 'INSERT INTO userposts ("user", "post") VALUES ($1, $2);',
        values: [request.body.user_id, request.body.post]
    })
        .then(res => response.status(200).json(request.body))
        .catch(err => response.status(400).json('An error occurred: ', err));
}

userController.allPosts = (request, response, next) => {
    pg.query('SELECT * FROM userposts')
        .then(res => {
            let posts = res.rows.reduce((acc, item) => {
                acc.push({id: item.user, post: item.post});
                return acc;
            }, [])
            request.body.return = posts;
            next();
        })
        .catch(err => response.status(400).json('An error occurred: ', err))
}



module.exports = userController;
