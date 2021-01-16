import { useEffect, useState, useRef, useCallback } from 'react'
import { useSocketContext } from '~/common/context'

export function useFreshNote(initialNote) {
  const [refreshedNote, setNote] = useState(initialNote)
  const currentNoteIdRef = useRef(refreshedNote?._id || null)
  const currentNoteUpdatedAtRef = useRef(!!refreshedNote?.updatedAt ? new Date(refreshedNote.updatedAt) : new Date())
  const { state } = useSocketContext()

  useEffect(() => {
    // console.log('EFFECT')
    // console.log(state.updatedNote)
    if (
      !!state.updatedNote?._id &&
      state.updatedNote?._id === currentNoteIdRef.current &&
      !!state.updatedNote?.updatedAt &&
      new Date(state.updatedNote?.updatedAt) > currentNoteUpdatedAtRef.current
    ) {
      setNote(state.updatedNote)
      currentNoteUpdatedAtRef.current = new Date(state.updatedNote.updatedAt)
    } else if (!!state.deletedNoteId && state.deletedNoteId === currentNoteIdRef.current) {
      setNote({ title: 'DELETED' })
      currentNoteUpdatedAtRef.current = new Date()
    }
  }, [JSON.stringify(state.updatedNote), state.deletedNoteId, JSON.stringify(initialNote), setNote])
  useEffect(() => {
    setNote(initialNote)
  }, [initialNote, setNote])

  return refreshedNote
}
