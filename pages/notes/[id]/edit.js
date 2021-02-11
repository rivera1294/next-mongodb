import { EditNotePage } from '~/common/components/EditNotePage'

const NEXT_APP_API_ENDPOINT = process.env.NEXT_APP_API_ENDPOINT

const EditNote = ({ note }) => {
  return <EditNotePage note={note} />
}

EditNote.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`${NEXT_APP_API_ENDPOINT}/notes/${id}`)
  const { data } = await res.json()

  return { note: data }
}

export default EditNote
