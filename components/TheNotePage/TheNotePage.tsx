import fetch from 'isomorphic-unfetch'
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Confirm, Button, Loader } from 'semantic-ui-react'
import { ActiveNote } from '~/components/ActiveNote'
import { useAuthContext } from '~/context'
import Container from '@material-ui/core/Container'
// import Typography from '@material-ui/core/Typography';
// See also: https://github.com/hadnazzar/nextjs-with-material-ui/blob/master/pages/about.js
import Box from '@material-ui/core/Box'
// import Button from '@material-ui/core/Button'
import { useStyles } from './styles'

const NEXT_APP_API_ENDPOINT = process.env.NEXT_APP_API_ENDPOINT

export const TheNotePage = ({ initNote: note }: any) => {
  const [confirm, setConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  // const note = useMemo(() => initNote, [JSON.stringify(initNote)])
  const classes = useStyles()

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
      // const _deleted =
      await fetch(`${NEXT_APP_API_ENDPOINT}/api/notes/${noteId}`, {
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
  const MemoizedBtnsBox = useMemo(
    () => (
      <Box my={4} className={classes.btnsBox}>
        <Button basic color="red" onClick={open}>
          Delete
        </Button>
        <Button basic color="blue" onClick={handleEdit}>
          Edit
        </Button>
      </Box>
    ),
    [open, handleEdit]
  )

  return (
    <Container maxWidth="md" className={classes.noPaddingMobile}>
      {isLogged && MemoizedBtnsBox}
      <Box my={4} className={classes.noMarginTopBottomMobile}>
        {isDeleting ? <Loader active /> : <div>{!!note && <ActiveNote note={note} />}</div>}
        <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
      </Box>
      {isLogged && MemoizedBtnsBox}
    </Container>
  )
}
