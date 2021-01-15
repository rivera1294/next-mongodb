import { useMemo } from 'react'
import Button from '@material-ui/core/Button'
import { useGlobalAppContext } from '~/common/hooks'
import { CircularProgress } from '@material-ui/core'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'

interface IProps {
  title: string
}

export const Tags = ({ title }: IProps) => {
  const tags = useMemo(() => (!!title ? title.split(' ').filter((elm: string) => elm[0] === '#') : []), [title])
  const { handleSearchByTitleSetText, isNotesLoading, state } = useGlobalAppContext()

  return (
    <>
      {tags.length > 0 &&
        tags.map((tag: string, i: number) => (
          <Button
            key={`${i}-${tag}`}
            startIcon={<LocalOfferIcon />}
            disabled={isNotesLoading || tag.toLowerCase() === state.searchByTitle.toLowerCase()}
            variant="outlined"
            size="small"
            onClick={() => handleSearchByTitleSetText(tag)}
            endIcon={
              isNotesLoading &&
              tag.toLowerCase() === state.searchByTitle.toLowerCase() && (
                <CircularProgress size={15} color="inherit" style={{ marginLeft: 'auto' }} />
              )
            }
          >
            {tag}
          </Button>
        ))}
    </>
  )
}
