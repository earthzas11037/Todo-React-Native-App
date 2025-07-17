import { forwardRef } from 'react'
import { Text as RNText } from 'react-native'
import MarkdownComponent, { MarkdownIt } from 'react-native-markdown-display'

const markdownItInstance = MarkdownIt({ typographer: true, html: true })

export const Markdown = forwardRef<RNText, any>(({ children, ...props }, ref) => {

  return (
    <MarkdownComponent style={{
      body: {
        padding: 0,
        margin: 0,
        fontSize: 16, fontFamily: 'NotoSansThai_400Regular'
      },
      strong: {
        padding: 0,
        margin: 0,
        fontSize: 16, fontFamily: 'NotoSansThai_600SemiBold'
      }
    }} markdownit={markdownItInstance}>
      {children}
    </MarkdownComponent>
  )
})
