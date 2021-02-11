import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) throw new Error('Check envs: JWT_SECRET was not provided')

export const authTokenValidator = (req) => {
  let isLogged = false

  try {
    const decoded = jwt.verify(req.header('token'), JWT_SECRET)
    const user = decoded.user
    // eslint-disable-next-line no-console
    // console.log(user)
    if (!!user.id) isLogged = true
  } catch (e) {
    // eslint-disable-next-line no-console
    // console.error(e)
  }

  return isLogged
}

export const mutateRequestIfTokenIsCorrect = (req) => {
  const token = req.header('token')

  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    req.user = decoded.user
  } catch (e) {
    // eslint-disable-next-line no-console
    // console.error(e)
  }
}
