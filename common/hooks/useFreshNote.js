import { useEffect, useState, useRef } from 'react'
import { useSocketContext } from '~/common/context'

export function useFreshNote(initialNote) {
  const [refreshedNote, setNote] = useState(initialNote)
  const handleUpdateThisNote = (data) => {
    setNote(data)
  }
  const currentNoteIdRef = useRef(refreshedNote?._id || null)
  const currentNoteUpdatedAtRef = useRef(!!refreshedNote?.updatedAt ? new Date(refreshedNote.updatedAt) : new Date())
  const { state } = useSocketContext()

  useEffect(() => {
    if (
      !!state.updatedNote?._id &&
      state.updatedNote?._id === currentNoteIdRef.current &&
      !!state.updatedNote?.updatedAt &&
      new Date(state.updatedNote?.updatedAt) > currentNoteUpdatedAtRef.current
    ) {
      handleUpdateThisNote(state.updatedNote)
      currentNoteUpdatedAtRef.current = new Date(state.updatedNote.updatedAt)
    } else if (!!state.deletedNoteId && state.deletedNoteId === currentNoteIdRef.current) {
      handleUpdateThisNote({ title: 'DELETED' })
      currentNoteUpdatedAtRef.current = new Date()
    }
  }, [JSON.stringify(state.updatedNote), state.deletedNoteId, handleUpdateThisNote])
  useEffect(() => {
    handleUpdateThisNote(initialNote)
  }, [JSON.stringify(initialNote), handleUpdateThisNote])

  return refreshedNote
}
