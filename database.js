const knex = createKnex({  
  client: 'pg',
  connection: 'postgres://@localhost:3000/social-test'
})

module.exports = knex 