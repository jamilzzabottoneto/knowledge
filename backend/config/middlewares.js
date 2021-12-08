const bodyParse = require('express')
const cors = require('cors')

//Difinição dos Middleware
module.exports = app => {
    app.use(bodyParse.json())
    app.use(bodyParse.urlencoded({extends: true}))
    app.use(cors())
}