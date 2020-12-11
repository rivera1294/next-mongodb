const next = require('next')
const expressRouter = require("./express-tools/e-api")

const isDev = process.env.NODE_ENV !== 'production'
const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const nextApp = next({ dev: isDev })
const nextHanlder = nextApp.getRequestHandler()
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

// const dotenv = require('dotenv')
// const isProduction = process.env.NODE_ENV === 'production'
// const envFileName = isProduction ? '.env.prod' : '.env.dev'
// dotenv.config(envFileName);

import { socketLogic } from '~/socket-logic'

// fake DB
// const messages = []

// socket.io server
// io.on('connection', socket => {
//   socket.on('message', (data) => {
//     messages.push(data)
//     socket.broadcast.emit('message', data)
//   })
// })

const _customIO = socketLogic(io)

nextApp.prepare()
  .then(() => {
    /**
     * Router Middleware
     * Router - /e-api/*
     * Method - *
     */
    app.use('/e-api', expressRouter)

    app.all('*', (req, res) => {
      req.io = _customIO
      return nextHanlder(req, res)
    })
      
    // const server = expressApp.listen(PORT, (err) => {
    //   if (err) throw err
    //   console.log(`> Ready on http://localhost:${PORT}`)
    // })

    // const io = require('socket.io')(server);
    // socketLogic(io)

    server.listen(PORT, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
