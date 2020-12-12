import fetch from 'isomorphic-unfetch'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Confirm, Button, Loader } from 'semantic-ui-react'
import { ActiveNote } from '~/components/ActiveNote'
import { useAuthContext } from '~/context'
// import { actionTypes as evt, IUpdatedNote } from '~/socket-logic'
import { useSocketContext } from '~/context'

const NEXT_APP_API_ENDPOINT = process.env.NEXT_APP_API_ENDPOINT

const Note = ({ note: initialNote }) => {
  const [note, setNote] = useState(initialNote)
  const handleUpdateThisNote = (data) => {
    setNote(data)
  }
  const currentNoteIdRef = useRef(note._id)
  const currentNoteUpdatedAtRef = useRef(!!note.updatedAt ? new Date(note.updatedAt) : new Date())
  const { state } = useSocketContext()

  useEffect(() => {
    if (
      !!state.updatedNote?._id &&
      state.updatedNote?._id === currentNoteIdRef.current &&
      !!state.updatedNote?.updatedAt &&
      new Date(state.updatedNote?.updatedAt) > currentNoteUpdatedAtRef.current
    ) {
      handleUpdateThisNote(state.updatedNote)
    }
  }, [JSON.stringify(state.updatedNote)])

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
          <div style={{ marginBottom: '20px' }}>
            <ActiveNote note={note} />
          </div>
        )}
        <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
      </div>
      <div className="standard-container">
        {isLogged && (
          <Button basic color="red" onClick={open}>
            Delete
          </Button>
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
