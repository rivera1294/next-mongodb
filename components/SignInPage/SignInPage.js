/* eslint-disable no-console */
import { useState, useMemo } from 'react'
import { Button, Form, Loader, Message } from 'semantic-ui-react'
import { validate } from './validate'
import { useRouter } from 'next/router'
import { useAuthContext } from '~/context'

const NEXT_APP_EXPRESS_API_ENDPOINT = process.env.NEXT_APP_EXPRESS_API_ENDPOINT

export const SignInPage = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()

  const isCorrect = useMemo(() => Object.keys(errors).length === 0, [JSON.stringify(errors)])
  const { handleLogin } = useAuthContext()
  const signIn = async () => {
    if (isSubmitting || !isCorrect) return
    setIsSubmitting(true)
    setErrors({})
    try {
      await fetch(`${NEXT_APP_EXPRESS_API_ENDPOINT}/users/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          if (!res.token) {
            if (!!res?.errors && Array.isArray(res.errors)) {
              throw new Error(res.errors.map(({ msg }) => msg || 'No msg').join('; '))
            }
            throw new Error(res?.msg || 'No token: Что-то пошло не так')
          }
          return res
        })
        .then(({ token }) => {
          handleLogin(token)
          router.push('/')
        })
        .catch((err) => {
          setIsSubmitting(false)
          setErrors({ response: err.message })
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let errs = validate(form)
    setErrors(errs)
    signIn()
  }

  const handleChange = (e) => {
    // const newErrors = {}

    // for (let err in errors) {
    //   console.log(err)
    //   if (e.target.name !== err) {
    //     newErrors[e.target.name] = errors[err]
    //   }
    // }
    setErrors({})
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="form-container">
      <h1>Sign In</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              error={errors.email ? { content: errors.email, pointing: 'below' } : null}
              label="Email"
              placeholder="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              error={errors.password ? { content: errors.password, pointing: 'below' } : null}
              label="Password"
              placeholder="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
            <Button type="submit" disabled={isSubmitting || !isCorrect}>
              Sign In
            </Button>
          </Form>
        )}
        {!!errors.response && (
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>{errors.response}</p>
          </Message>
        )}
      </div>
      {/* <pre style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>{JSON.stringify(form, null, 2)}</pre> */}
    </div>
  )
}
