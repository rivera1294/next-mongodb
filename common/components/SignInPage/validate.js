import * as EmailValidator from 'email-validator'

export const validate = (form) => {
  let err = {}

  if (!form.email) {
    err.email = 'Email is required'
  } else if (!EmailValidator.validate(form.email)) {
    err.email = 'Email is incorrect'
  }
  if (!form.password) {
    err.password = 'Password is required'
  } else if (form.password.length < 6) {
    err.password = '6 chars minimum'
  }

  return err
}
