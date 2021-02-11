import { useState, useMemo } from 'react'
import fetch from 'isomorphic-unfetch'
import { Button, Form, Loader, Message } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { useAuthContext } from '~/common/context'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Checkbox } from '@material-ui/core'

const NEXT_APP_API_ENDPOINT = process.env.NEXT_APP_API_ENDPOINT

const NewNote = () => {
  const [form, setForm] = useState({ title: '', description: '', isPrivate: false })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()
  const { isLogged } = useAuthContext()
  const isCorrect = useMemo(() => Object.keys(errors).length === 0, [JSON.stringify(errors)])

  const createNote = async () => {
    let errs = validate()
    setErrors(errs)
    setIsSubmitting(true)
    try {
      await fetch(`${NEXT_APP_API_ENDPOINT}/notes`, {
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
          if (!res.success) {
            if (!!res?.errors && Array.isArray(res.errors)) {
              throw new Error(res.errors.map(({ msg }) => msg || 'No msg').join('; '))
            }
            throw new Error(res?.msg || 'No success: Что-то пошло не так')
          }
          return res
        })
        .then((res) => {
          router.push(`/notes/${res.data._id}`)
        })
        .catch((err) => {
          setIsSubmitting(false)
          setErrors({ response: err.message })
        })
    } catch (_err) {
      // TODO: logger?
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createNote()
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  const handleCheck = (e) => {
    e.persist()
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    })
  }

  const validate = () => {
    let err = {}

    if (!form.title) {
      err.title = 'Title is required'
    }
    if (!form.description) {
      err.description = 'Description is required'
    }

    return err
  }

  return (
    <div className="form-container">
      <h1 className="white">Create Note</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
              label="Title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
            <Form.TextArea
              fluid="true"
              label="Descriprtion"
              placeholder="Use markdown syntax"
              name="description"
              error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
              onChange={handleChange}
              rows={8}
            />
            {isLogged && (
              <>
                <Button disabled={isSubmitting || !isCorrect} type="submit">
                  Create
                </Button>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox checked={form.isPrivate} onChange={handleCheck} name="isPrivate" color="primary" />
                    }
                    label="isPrivate"
                  />
                </FormGroup>
              </>
            )}
          </Form>
        )}
      </div>
      {!!errors.response && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{errors.response}</p>
        </Message>
      )}
    </div>
  )
}

export default NewNote
