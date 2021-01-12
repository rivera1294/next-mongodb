import dbConnect from '~/utils/dbConnect'
const express = require('express')
const { graphqlHTTP } = require('express-graphql') // Note: GraphQL middleware options must contain a schema.
// const mongoose = require('mongoose')
const schema = require('./schema')
const resolvers = require('./resolvers')

const isDev = process.env.NODE_ENV === 'development'

dbConnect()

const gqlApi = express()

gqlApi.use(
  '/',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: isDev,
  })
)

module.exports = gqlApi
