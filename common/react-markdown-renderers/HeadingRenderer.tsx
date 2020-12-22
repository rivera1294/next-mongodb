import React from 'react'
import slugify from 'slugify'

function flatten(text: string, child: any): React.ReactElement {
  // @ts-ignore
  return typeof child === 'string' ? text + child : React.Children.toArray(child.props.children).reduce(flatten, text)
}

export function HeadingRenderer(props: any) {
  var children = React.Children.toArray(props.children)

  // @ts-ignore

  var text = children.reduce(flatten, '')

  // @ts-ignore

  var slug = slugify(`${props.level}-${text}`).toLowerCase() // .replace(/\W/g, '-')

  return React.createElement('h' + props.level, { id: slug }, props.children)
}
