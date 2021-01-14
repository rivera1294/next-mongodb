import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    truncate: {
      whiteSpace: 'nowrap',
      width: '100%', // IE6 needs any width
      overflow: 'hidden', // "overflow" value must be different from  visible"
      // -o-text-overflow: 'ellipsis // Opera < 11
      textOverflow: 'ellipsis', // IE, Safari (WebKit), Opera >= 11, FF > 6
    },
  })
)
