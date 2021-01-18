import { forwardRef, useMemo, useCallback, useEffect } from 'react'
import {
  // Accordion,
  // AccordionSummary,
  // AccordionDetails,
  // AccordionActions,
  Button as MuiButton,
  // Checkbox,
  // CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogTitle,
  // Divider,
  // FormControl,
  // FormControlLabel,
  // FormGroup,
  // TextField,
  // withStyles,
  // Typography,
  // Grid,
} from '@material-ui/core'
import Slide from '@material-ui/core/Slide'
import { useFreshNote, useGlobalAppContext, useWindowSize } from '~/common/hooks'
import { ActiveNote } from './ActiveNote'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { theNotePageRenderers } from '~/common/react-markdown-renderers'
import { useUnscrolledBody } from '~/common/hooks'

const TransitionUp = forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />
})

export const MobileDialogIfNecessary = () => {
  const { state, handleResetActiveNote } = useGlobalAppContext()
  const { isMobile } = useWindowSize()
  const activeNote = useMemo(() => state.activeNote, [state.activeNote?._id])
  const freshNote = useFreshNote(activeNote)
  // useEffect(() => { console.log(freshNote?._id) }, [freshNote?._id])
  const isOpened = useMemo(() => !!freshNote?._id, [freshNote?._id])
  const { toggleScrollBody } = useUnscrolledBody(false)
  useEffect(() => {
    toggleScrollBody(isOpened)
  }, [isOpened, toggleScrollBody])
  const handleCloseModal = useCallback(() => {
    handleResetActiveNote()
  }, [handleResetActiveNote])

  if (!isMobile) return null
  return (
    <Dialog
      open={isOpened}
      onClose={handleCloseModal}
      scroll="paper"
      aria-labelledby={`scroll-dialog-title-activeNote-mobile_${freshNote?._id}`}
      // fullWidth
      fullScreen
      // maxWidth="lg"
      // @ts-ignore
      TransitionComponent={TransitionUp}
    >
      {/* <DialogTitle id={`scroll-dialog-title-activeNote-mobile_${freshNote?._id}`}>{freshNote?.title}</DialogTitle> */}
      <DialogContent
        dividers={true}
        // className={classes.dialogMDContent}
        style={{ padding: 0 }}
      >
        <ActiveNote
          note={state.activeNote}
          isTagsNessesary
          descriptionRenderer={({ description }) => {
            return (
              <div className="description-markdown">
                <ReactMarkdown
                  // @ts-ignore
                  plugins={[gfm, { singleTilde: false }]}
                  renderers={theNotePageRenderers}
                  children={description}
                />
              </div>
            )
          }}
        />
      </DialogContent>
      <DialogActions>
        <MuiButton
          color="primary"
          size="large"
          variant="outlined"
          onClick={handleCloseModal}
          // endIcon={<EditIcon />}
        >
          Close
        </MuiButton>
      </DialogActions>
    </Dialog>
  )
}
