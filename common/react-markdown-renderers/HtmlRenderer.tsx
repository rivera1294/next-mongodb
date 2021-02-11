import { YoutubePlayer } from './YoutubeRenderer/YoutubePlayer'
import JsxParser from 'react-jsx-parser'
import Gist from 'react-gist'

const componentTransforms = {
  React: (props: any) => <>{props.children}</>,
  YoutubePlayer,
  Gist: ({ gistId }: { gistId: string }) => <Gist id={gistId} />,
}

// @ts-ignore
export const HtmlRenderer = (props: any) => <JsxParser jsx={props.value} components={componentTransforms} />
