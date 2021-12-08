const config = require('../knexfile.js')
const knex = require('knex')(config)

//executar as migrations assim que executar - Porem pode não ser algo positivo!
knex.migrate.latest([config])

module.exports = knex