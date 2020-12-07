
const express = require('express')

const expressApi = express()
const usersRouter = require('./users')

expressApi.use('/users', usersRouter)

module.exports = expressApi
