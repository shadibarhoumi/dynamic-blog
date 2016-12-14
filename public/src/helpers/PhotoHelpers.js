import moment from 'moment'

export const trimTitle = (title) => {
  var hashtagIndex = title.indexOf('#')
  if (hashtagIndex === -1) {
    return title.trim()
  } else {
    return title.substr(0, hashtagIndex).trim()
  }
}

export const extractTags = (title) => {
  const tags = title.match(/#[A-Za-z0-9]+/g)
  return tags === null ? [] : tags.map(tag => tag.substring(1))
}

export const dateFormatter = {}

dateFormatter.formatDate = (date) =>
  moment(date).format('dddd, MMMM Do')

dateFormatter.formatDate = (date) =>
  moment(date).format('dddd, MMMM Do')

dateFormatter.formatDateFromSlug = (date) =>
  moment(date, 'MM-DD-YYYY').format('dddd, MMMM Do')

dateFormatter.formatPhotoDate = (date) =>
  moment(date).format('dddd MMMM D') + ', ' + moment(date).format('h:mma')
