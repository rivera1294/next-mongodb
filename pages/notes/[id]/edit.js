import { useState, useEffect, useMemo } from 'react'
import fetch from 'isomorphic-unfetch'
import { Button, Form, Loader } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { useWindowSize } from 'react-use'
import MarkdownIt from 'markdown-it'
import loadable from '@loadable/component'
import { useAuthContext } from '~/context'
import { Rating } from 'semantic-ui-react'

const NEXT_APP_API_ENDPOINT = process.env.NEXT_APP_API_ENDPOINT
const mdParser = new MarkdownIt({
  html: false,
  langPrefix: 'language-',
})

const MDEditor = loadable(() => import('react-markdown-editor-lite')) // Ленивая загрузка

const EditNote = ({ note }) => {
  const [form, setForm] = useState({ title: note.title, description: note.description, priority: note.priority || 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()
  const { isLogged } = useAuthContext()

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
    <div className="standard-container">
      <h1>
        Edit Note <Rating onRate={handleSetRate} maxRating={5} defaultRating={form.priority} disabled={isSubmitting} />
      </h1>
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
              value={form.title}
              onChange={handleChange}
            />
            {/* <Form.TextArea
                                fluid
                                label='Descriprtion'
                                placeholder='Description'
                                name='description'
                                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                value={form.description}
                                onChange={handleChange}
                            /> */}
            <MDEditor
              value={form.description}
              style={{ minHeight }}
              renderHTML={(text) => mdParser.render(text)}
              // renderHTML={(text) => (
              //     <ReactMarkdown
              //         plugins={[gfm, {singleTilde: false}]}
              //         renderers={renderers}
              //         children={text}
              //     />
              // )}
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
            {isLogged && <Button type="submit">Update</Button>}
          </Form>
        )}
      </div>
    </div>
  )
}

EditNote.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`${NEXT_APP_API_ENDPOINT}/api/notes/${id}`)
  const { data } = await res.json()

  return { note: data }
}

export default EditNote
