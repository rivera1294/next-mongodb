import { BlockquoteRenderer } from './BlockquoteRenderer'
import { CodeRendererSynthwave84, CodeRendererMaterialDark } from './CodeRenderer'
import { HeadingRenderer } from './HeadingRenderer'
import { ImageRenderer } from './ImageRenderer'

export * from './BlockquoteRenderer'
export * from './CodeRenderer'
export * from './HeadingRenderer'
export * from './ImageRenderer'

export const baseRenderers = {
  code: CodeRendererSynthwave84,
  image: ImageRenderer,
  blockquote: BlockquoteRenderer,
}

export const theNotePageRenderers = {
  blockquote: BlockquoteRenderer,
  code: CodeRendererMaterialDark,
  image: ImageRenderer,
  heading: HeadingRenderer,
}
