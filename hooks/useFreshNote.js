import { useEffect, useState, useRef } from 'react'
import { useSocketContext } from '~/context'

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
    }
  }, [JSON.stringify(state.updatedNote), JSON.stringify(initialNote)])

  return refreshedNote
}
