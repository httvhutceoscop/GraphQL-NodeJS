import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import routes from './rest/routes'

const express = require('express')
const bodyParser = require('body-parser')
const { GraphQLServer } = require('graphql-yoga')

const app = express()

// Middlewares
app.use(bodyParser.json())

// Mount REST on /api
// app.use('/api', routes)

const server = new GraphQLServer({
  typeDefs,
  resolvers: resolvers()
})
const options = {
  port: 4000,
  // endpoint: '/graphql',
  // subscriptions: '/subscriptions',
  playground: '/playground'
}

server.express.use('/api', routes)
server.start(options, ({ port }) => console.log(`Server is running on http://localhost:${port}`))
