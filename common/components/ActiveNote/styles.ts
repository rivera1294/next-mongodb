import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    buttonsBox: {
      marginTop: '15px',

      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      '& > button': {
        marginBottom: '5px',
      },
      '& > button:not(:last-child)': {
        marginRight: '5px',
      },
    },
  })
)
