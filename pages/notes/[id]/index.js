import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Confirm, Button, Loader } from 'semantic-ui-react'
import { ActiveNote } from '~/components/ActiveNote'
import { useAuthContext } from '~/context'

const NEXT_APP_API_ENDPOINT = process.env.NEXT_APP_API_ENDPOINT

const Note = ({ note }) => {
  const [confirm, setConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isDeleting) {
      deleteNote()
    }
  }, [isDeleting])

  const open = () => setConfirm(true)
  const close = () => setConfirm(false)
  const deleteNote = async () => {
    const noteId = router.query.id
    try {
      const _deleted = await fetch(`${NEXT_APP_API_ENDPOINT}/api/notes/${noteId}`, {
        method: 'Delete',
      })

      router.push('/')
    } catch (_err) {
      // console.log(error)
      // TODO: logger
    }
  }
  const handleEdit = () => {
    const noteId = router.query.id

    router.push(`/notes/${noteId}/edit`)
  }
  const handleDelete = async () => {
    setIsDeleting(true)
    close()
  }
  const { isLogged } = useAuthContext()

  return (
    <>
      <div className="standard-container no-padded">
        {isDeleting ? (
          <Loader active />
        ) : (
          <div style={{ marginBottom: '20px' }}>{!!note && <ActiveNote note={note} />}</div>
        )}
        <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
      </div>
      <div className="standard-container">
        {isLogged && (
          <>
            <Button basic color="red" onClick={open}>
              Delete
            </Button>
            <Button basic color="blue" onClick={handleEdit}>
              Edit
            </Button>
          </>
        )}
      </div>
    </>
  )
}

Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`${NEXT_APP_API_ENDPOINT}/api/notes/${id}`)
  const { data } = await res.json()

  return { note: data }
}

export default Note
