import { TheNotePage } from '~/common/components/TheNotePage'

const NEXT_APP_API_ENDPOINT = process.env.NEXT_APP_API_ENDPOINT

const Note = ({ note }) => {
  return <TheNotePage initNote={note} />
}

Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`${NEXT_APP_API_ENDPOINT}/notes/${id}`)
  const { data } = await res.json()

  return { note: data }
}

export default Note
