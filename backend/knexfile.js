const {db} = require('./.env')

module.exports = {
  client: 'postgresql',
  connection: db,
  // {
  //   database: 'knowledge',
  //   user:     'postgres',
  //   password: 'J!9Z9!N'
  // },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};
