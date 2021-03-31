import React, { ReactElement } from 'react'

type SupportedTags = 'strong' | 'em' | 'del' | 'span' 

const tags: Map<string, SupportedTags> = new Map()
tags.set('*', 'strong') // bold
tags.set('_', 'em') // italic
tags.set('~', 'del') // strike through

const pushContent = (
  parsedContent: Array<ReactElement | string>,
  content: string,
  tagName: SupportedTags
) => {
  parsedContent.push(React.createElement(tagName, { key: content }, content))
}

export const parseMarkdown = (rawMarkdown: string): React.ReactNode => {
  let currentTag: SupportedTags | '' = ''
  let currentContent = ''

  const parsedMarkdown: Array<ReactElement | string> = []

  for (let i = 0; i < rawMarkdown.length; i++) {
    const character = rawMarkdown[i]
    const characterIsATag = tags.has(character)

    // When character is not a tag
    if (characterIsATag === false) {
      currentContent += character
    }

    // When first tag found
    if (currentTag === '' && characterIsATag) {
      currentTag = tags.get(character) as SupportedTags
      if (currentContent !== '') {
        // Push all current content as normal span
        pushContent(parsedMarkdown, currentContent, 'span')
      }

      currentContent = ''
    } else {
      // When possible closing tag found
      if (characterIsATag) {
        const possibleClosingTag = tags.get(character) as SupportedTags
        // Push tags
        if (possibleClosingTag === currentTag) {
          pushContent(parsedMarkdown, currentContent, currentTag)
          currentTag = ''
          currentContent = ''
        }
      }
    }

    // When first tag found but it reaches the end and no closing tag, treat it as normal character
    if (currentContent !== '' && i === rawMarkdown.length - 1) {
      pushContent(parsedMarkdown, currentContent, 'span')
    }
  }

  return parsedMarkdown
}
