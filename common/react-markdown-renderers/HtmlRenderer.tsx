import { YoutubePlayer } from './YoutubeRenderer/YoutubePlayer'
import JsxParser from 'react-jsx-parser'

const componentTransforms = {
  React: (props: any) => <>{props.children}</>,
  YoutubePlayer,
}

// @ts-ignore
export const HtmlRenderer = (props: any) => <JsxParser jsx={props.value} components={componentTransforms} />
