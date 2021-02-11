/* eslint-disable no-console */
import { mutateRequestIfTokenIsCorrect } from '~/utils/express/authTokenValidator'
// const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) throw new Error('Check envs: JWT_SECRET was not provided')

module.exports = function (req, res, next) {
  // if (!req.header('token')) return res.status(401).json({ message: 'Auth Error' })

  try {
    mutateRequestIfTokenIsCorrect(req) // NOTE: Must have
    next()
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: `Auth middleware error: ${e.message || 'Invalid Token'}` })
  }
}
