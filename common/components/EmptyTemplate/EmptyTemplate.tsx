import { useStyles } from './styles'

export const EmptyTemplate = () => {
  const classes = useStyles()

  return (
    <div className={classes.img}>
      <div className="bg"></div>
      Click on note title for preview...
    </div>
  )
}
