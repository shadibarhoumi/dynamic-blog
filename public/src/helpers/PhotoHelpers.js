export const trimTitle = (title) => {
  return title.substr(0, title.indexOf('#')).trim()
}

export const extractTags = (title) => {
  const tags = title.match(/#[A-Za-z0-9]+/g)
  return tags === null ? [] : tags.map(tag => tag.substring(1))
}