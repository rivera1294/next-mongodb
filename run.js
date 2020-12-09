const express = require('express')
const next = require('next')
const expressRouter = require("./express-tools/e-api")

const isDev = process.env.NODE_ENV !== 'production'
const app = next({ dev: isDev })
const handle = app.getRequestHandler()
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

// const dotenv = require('dotenv')
// const isProduction = process.env.NODE_ENV === 'production'
// const envFileName = isProduction ? '.env.prod' : '.env.dev'

// dotenv.config(envFileName);

app.prepare()
  .then(() => {
    const server = express()

    /**
     * Router Middleware
     * Router - /e-api/*
     * Method - *
     */
    server.use('/e-api', expressRouter)

    server.all('*', (req, res) => {
      return handle(req, res)
    })
      
    server.listen(PORT, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
