import { useState, useEffect, useMemo } from 'react'
import fetch from 'isomorphic-unfetch'
import { Button, Form, Loader } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { useWindowSize } from 'react-use'
import MarkdownIt from 'markdown-it'
import loadable from '@loadable/component'
import { useAuthContext } from '~/common/context'
import { Rating } from 'semantic-ui-react'
import Container from '@material-ui/core/Container'
// See also: https://github.com/hadnazzar/nextjs-with-material-ui/blob/master/pages/about.js
import Box from '@material-ui/core/Box'
import { useBaseStyles } from '~/common/styled-mui/baseStyles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Checkbox } from '@material-ui/core'

const NEXT_APP_API_ENDPOINT = process.env.NEXT_APP_API_ENDPOINT
const mdParser = new MarkdownIt({
  html: false,
  langPrefix: 'language-',
})

const MDEditor = loadable(() => import('react-markdown-editor-lite')) // Ленивая загрузка

export const EditNotePage = ({ note }) => {
  const [form, setForm] = useState({
    title: note.title,
    description: note.description,
    priority: note.priority || 0,
    isPrivate: note.isPrivate || false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()
  const { isLogged } = useAuthContext()
  const baseClasses = useBaseStyles()

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateNote()
      } else {
        setIsSubmitting(false)
      }
    }
  }, [errors, isSubmitting])

  const updateNote = async () => {
    try {
      const body = {}
      Object.keys(form).forEach((key) => {
        switch (key) {
          case 'title':
          case 'description':
            body[key] = form[key]
            break
          case 'isPrivate':
            body[key] = form[key]
            break
          case 'priority':
            if (!!form[key]) body[key] = form[key]
            break
          default:
            break
        }
      })
      const _res = await fetch(`${NEXT_APP_API_ENDPOINT}/api/notes/${router.query.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      router.push(`/notes/${router.query.id}`)
    } catch (_err) {
      // console.log(err)
      // TODO: logger
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let errs = validate()
    setErrors(errs)
    setIsSubmitting(true)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  const handleCheck = (e) => {
    e.persist()
    // eslint-disable-next-line no-console
    // console.log(e)
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    })
  }

  const handleSetRate = (e, { rating, maxRating }) => {
    handleChange({ target: { name: 'priority', value: rating } })
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
  const { width } = useWindowSize()
  const minHeight = useMemo(() => (width > 767 ? '450px' : '300px'), [width])

  return (
    <Container maxWidth="md" className={baseClasses.noPaddingMobile}>
      <Box my={4} className={baseClasses.noMarginTopBottomMobile}>
        <h1 className="white">
          <span style={{ marginRight: '15px' }}>Edit</span>
          <Rating onRate={handleSetRate} maxRating={5} defaultRating={form.priority} disabled={isSubmitting} />
        </h1>
      </Box>

      {isSubmitting ? (
        <Loader active inline="centered" />
      ) : (
        <Form onSubmit={handleSubmit}>
          {isLogged && (
            <Box my={4} className={baseClasses.btnsBox}>
              <Button type="submit">Update</Button>
            </Box>
          )}
          <Box my={4}>
            <Form.Input
              fluid
              error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
              label="Title"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </Box>
          <Box my={4}>
            <MDEditor
              value={form.description}
              style={{ minHeight }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={({ text }) => {
                handleChange({ target: { value: text, name: 'description' } })
              }}
              config={{
                view: { menu: false, md: true, html: width > 767 },
                canView: {
                  menu: false,
                  md: true,
                  html: width > 767,
                  fullScreen: true,
                  hideMenu: true,
                },
              }}
            />
          </Box>
          {isLogged && (
            <Box my={4} className={baseClasses.btnsBox}>
              <Button type="submit">Update</Button>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={form.isPrivate} onChange={handleCheck} name="isPrivate" color="primary" />
                  }
                  label="isPrivate"
                />
              </FormGroup>
            </Box>
          )}
        </Form>
      )}
    </Container>
  )
}
