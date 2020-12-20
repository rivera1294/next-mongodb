import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { materialDark as prismTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { synthwave84, materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export const CodeRendererSynthwave84 = ({ language, value }: any) => {
  return <SyntaxHighlighter showLineNumbers={true} style={synthwave84} language={language} children={value} />
}

export const CodeRendererMaterialDark = ({ language, value }: any) => {
  return <SyntaxHighlighter showLineNumbers={true} style={materialDark} language={language} children={value} />
}
