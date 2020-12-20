import { useState } from 'react'

export const ImageRenderer = (props: any) => {
  const [fullSize, setFullSize] = useState<boolean>(false)
  const handleClick = () => {
    setFullSize(!fullSize)
  }
  return <img className={fullSize ? 'large' : 'small'} alt={props.alt} src={props.src} onClick={handleClick} />
}
