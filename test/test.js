const mocha = require('mocha');
const request = require('supertest');
const assert = require('chai').assert

const app = require('../server/server.js');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

// create user 
// verify user 
// grab users 
// return posts from users 
// create new post in database


describe('server unit tests', () => {

	describe('/', () => {
		describe('GET', () => {
			it('should create new user', (done) => {
    		request(HOST)
    			.get('/')
          .end((err, res) => {
          	if (err) done(err); 
          	assert(res.headers['content-type'] == 'text/html; charset=UTF-8', 'expected content type to equal text/html');
          	done();
          });
    	});
		});
  });

  describe('"#verify"', () => {
    it('should verify that a given user exists', (done) => {
      request(HOST)
      	.post('/authenticate/validate')
      	.send({ email: 'test123@test.com', password: 'password' })
      	.end((err, res) => {
      		if (err) done(err); 
      		// test user id exists 
      		// check id that row from postgres
      		assert(res.body.id !== undefined, 'expected content type to equal text/html');
      		// console.log('res data', res.body.id);
      		done();
      	})

    })
  }) 

  describe('"#grab"', () => {
    it('should return a list of users', () => {
      
    })
  }) 

  describe('"#return"', () => {
    it('should return a list of posts for a given user', () => {
      
    })
  }) 

  describe('"#post"', () => {
    it('should create a new post in db', () => {
      
    })
  }) 
});
