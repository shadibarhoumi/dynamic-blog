import moment from 'moment'

export const trimTitle = (title) => {
  return title.substr(0, title.indexOf('#')).trim()
}

export const extractTags = (title) => {
  const tags = title.match(/#[A-Za-z0-9]+/g)
  return tags === null ? [] : tags.map(tag => tag.substring(1))
}

export const dateFormatter = {}

dateFormatter.formatDate = (date) => {
  return moment(date).format('dddd, MMMM Do')
}

dateFormatter.formatDateFromSlug = (date) => {
  return moment(date, 'MM-DD-YYYY').format('dddd, MMMM Do')
}

dateFormatter.toISOString = (date) => {
  return moment(date).toISOString()
}