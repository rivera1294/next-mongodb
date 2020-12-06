const express = require('express')
const next = require('next')
// const bodyParser = require("body-parser")
const usersRouter = require("./express-tools/routers/users") // New addition

const isDev = process.env.NODE_ENV !== 'production'
const app = next({ dev: isDev })
const handle = app.getRequestHandler()
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000

// const fs = require('fs')
// const dotenv = require('dotenv')
// const isProduction = process.env.NODE_ENV === 'production'
// const envFileName = isProduction ? '.env.prod' : '.env.dev'
// const env = dotenv.parse(fs.readFileSync(envFileName))

// dotenv.config(envFileName);

// console.log(process.env.MONGO_URI)

// const envConfig = dotenv.parse(fs.readFileSync(envFileName));
// for (const k in envConfig) process.env[k] = envConfig[k];

app.prepare()
  .then(() => {
    const server = express()

    // SAMPLE:
    // server.use('/api/*', (req, res, next) => {
    //   // const actualPage = '/post'
    //   // const queryParams = { id: req.params.id } 
    //   // app.render(req, res, actualPage, queryParams)
    //   console.log('--- /notes/:id')
    //   next()
    // })

    // Middleware
    // server.use(bodyParser.json());

    /**
     * Router Middleware
     * Router - /users/*
     * Method - *
     */
    server.use("/users", usersRouter);

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
