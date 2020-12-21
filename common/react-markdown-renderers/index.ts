import { CodeRendererSynthwave84 } from './CodeRenderer'
import { ImageRenderer } from './ImageRenderer'
// import { EmojiRenderer } from './EmojiRenderer'

export * from './CodeRenderer'
export * from './EmojiRenderer'
export * from './HeadingRenderer'
export * from './ImageRenderer'

export const baseRenderers = {
  code: CodeRendererSynthwave84,
  image: ImageRenderer,
  // text: EmojiRenderer,
}
