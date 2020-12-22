import { CodeRendererSynthwave84 } from './CodeRenderer'
import { ImageRenderer } from './ImageRenderer'

export * from './CodeRenderer'
export * from './HeadingRenderer'
export * from './ImageRenderer'

export const baseRenderers = {
  code: CodeRendererSynthwave84,
  image: ImageRenderer,
}
