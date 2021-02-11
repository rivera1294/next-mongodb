import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { synthwave84, materialDark, materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export const CodeRendererSynthwave84 = ({ language, value }: any) => {
  return <SyntaxHighlighter showLineNumbers={false} style={synthwave84} language={language} children={value} />
}

export const CodeRendererMaterialDark = ({ language, value }: any) => {
  return <SyntaxHighlighter showLineNumbers={true} style={materialDark} language={language} children={value} />
}

export const CodeRendererMaterialOceanic = ({ language, value }: any) => {
  return <SyntaxHighlighter showLineNumbers={true} style={materialOceanic} language={language} children={value} />
}
