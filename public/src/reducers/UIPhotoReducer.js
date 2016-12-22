import { types } from '../constants/UIPhotoConstants'

const handlers = {}

handlers[types.SET_SLIDESHOW_VISIBLE] = (state, action) => {
  return state.setIn(['slideshow', 'visible'], action.visible)
}

handlers[types.SET_SLIDESHOW_PHOTO_INDEX] = (state, action) => {
  return state.setIn(['slideshow', 'photoIndex'], action.photoIndex)
}

handlers[types.APPLY_TAG_FILTER] = (state, action) => {
  const tags = state.getIn(['currentFilter', 'tags'])
  return tags.contains(action.tag) ?
    state : state.setIn(['currentFilter', 'tags'], tags.push(action.tag))
}

handlers[types.REMOVE_TAG_FILTER] = (state, action) => {
  const tags = state.getIn(['currentFilter', 'tags'])
  if (tags.contains(action.tag)) {
    const tagIndex = tags.indexOf(action.tag)
    return state.setIn(['currentFilter', 'tags'], tags.remove(tagIndex))
  } else {
    return state
  }
}

handlers[types.APPLY_DATE_FILTER] = (state, action) => {
  return state
    .setIn(['currentFilter', 'startDate'], action.startDate)
    .setIn(['currentFilter', 'endDate'], action.endDate)
}

export default handlers